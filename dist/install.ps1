# Thoth installer for Windows — turns this computer into a Thoth node.
#
# One-liner (once hosted):
#   irm https://thothcraft.com/install.ps1 | iex
# From a cloned repo:
#   powershell -ExecutionPolicy Bypass -File install.ps1 [-Local .\packages]
#
# Installs the whispy SDK + thoth node app, then registers `thoth daemon`
# as a logon task so the node stays reachable via whispy.local("<this-pc>")
# and heartbeats to Brain once paired.

[CmdletBinding()]
param(
    # Install from local checkouts instead of git (path containing whispy/ and thoth/).
    [string]$Local = "",
    # Skip registering the background daemon task.
    [switch]$NoDaemon,
    # Skip sensor extras (opencv, pyserial, psutil).
    [switch]$NoSensors,
    # Skip enabling OpenSSH server.
    [switch]$NoSsh
)

$ErrorActionPreference = "Stop"

function Find-Python {
    foreach ($cmd in @("python", "py", "python3")) {
        $exe = Get-Command $cmd -ErrorAction SilentlyContinue
        if ($exe) {
            try {
                $ver = & $cmd -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')" 2>$null
                if ($ver -and [version]$ver -ge [version]"3.10") { return $cmd }
            } catch { }
        }
    }
    return $null
}

Write-Host "== Thoth installer (Windows) ==" -ForegroundColor Cyan

$py = Find-Python
if (-not $py) {
    Write-Host "Python 3.10+ not found. Install it from https://www.python.org/downloads/ (check 'Add to PATH') and re-run." -ForegroundColor Red
    exit 1
}
Write-Host "Using Python: $(& $py --version)"

$whispyRepo = "git+https://github.com/gadm21/whispy.git#subdirectory=packages/whispy"
$thothRepo = "git+https://github.com/Thothcraft/thoth.git"

if ($Local) {
    $whispy = Join-Path $Local "whispy"
    $thoth = Join-Path $Local "thoth"
    if (-not (Test-Path $whispy) -or -not (Test-Path $thoth)) {
        Write-Host "-Local must point at a directory containing whispy/ and thoth/ package dirs" -ForegroundColor Red
        exit 1
    }
    $whispySpec = if ($NoSensors) { $whispy } else { "$whispy[sensors]" }
    Write-Host "Installing from local checkout: $Local"
    $origPref = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    & $py -m pip install --upgrade -e $whispySpec -e $thoth
    $code = $LASTEXITCODE
    $ErrorActionPreference = $origPref
    if ($code -ne 0) { Write-Host "pip install failed" -ForegroundColor Red; exit 1 }
}
else {
    Write-Host "Installing whispy + thoth from git..."
    $whispySpec = if ($NoSensors) { $whispyRepo } else { "$whispyRepo[sensors]" }
    $origPref = $ErrorActionPreference
    $ErrorActionPreference = "Continue"
    & $py -m pip install --upgrade $whispySpec $thothRepo
    $code = $LASTEXITCODE
    if ($code -ne 0) {
        # pip can't combine extras with direct refs on older versions
        & $py -m pip install --upgrade $whispyRepo $thothRepo
        $code = $LASTEXITCODE
        if ($code -eq 0 -and -not $NoSensors) {
            & $py -m pip install --upgrade opencv-python pyserial psutil
        }
    }
    $ErrorActionPreference = $origPref
    if ($code -ne 0) { Write-Host "pip install failed" -ForegroundColor Red; exit 1 }
}

function Enable-SshServer {
    Write-Host "Ensuring OpenSSH Server is configured..." -ForegroundColor Cyan
    try {
        $sshd = Get-Service -Name "sshd" -ErrorAction SilentlyContinue
        if (-not $sshd) {
            Write-Host "Installing OpenSSH Server Windows capability..."
            Add-WindowsCapability -Online -Name "OpenSSH.Server~~~~0.0.1.0" -ErrorAction SilentlyContinue | Out-Null
            $sshd = Get-Service -Name "sshd" -ErrorAction SilentlyContinue
        }
        if ($sshd) {
            Set-Service -Name "sshd" -StartupType 'Automatic' -ErrorAction SilentlyContinue
            Start-Service -Name "sshd" -ErrorAction SilentlyContinue
            if (Get-Command "New-NetFirewallRule" -ErrorAction SilentlyContinue) {
                if (-not (Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue)) {
                    New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22 -ErrorAction SilentlyContinue | Out-Null
                }
            }
            Write-Host "✓ OpenSSH Server (sshd) enabled and running" -ForegroundColor Green
        } else {
            Write-Host "Note: OpenSSH Server could not be enabled automatically (run PowerShell as Administrator to enable sshd)." -ForegroundColor Yellow
        }
    } catch {
        Write-Host "Note: Could not enable OpenSSH Server ($($_.Exception.Message))." -ForegroundColor Yellow
    }
}

$userScripts = & $py -c "import sysconfig; print(sysconfig.get_path('scripts', 'nt_user'))"
$sysScripts = & $py -c "import sysconfig; print(sysconfig.get_path('scripts'))"

# Ensure user scripts are in Windows User PATH
try {
    $currentPath = [Environment]::GetEnvironmentVariable('Path', 'User')
    if ($userScripts -and ($currentPath -notlike "*$userScripts*")) {
        $newPath = if ($currentPath) { "$userScripts;$currentPath" } else { $userScripts }
        [Environment]::SetEnvironmentVariable('Path', $newPath, 'User')
        $env:PATH = "$userScripts;$env:PATH"
        Write-Host "✓ Added Python Scripts to Windows User PATH: $userScripts" -ForegroundColor Green
    }
} catch { }

# Ensure Git Bash profiles have the PATH export
try {
    $posixScripts = $userScripts.Replace('\', '/').Replace('C:', '/c')
    $bashExport = "`n# Added by Thoth`nexport PATH=`"`$PATH:$posixScripts`"`n"
    foreach ($profileName in @(".bashrc", ".bash_profile")) {
        $pPath = Join-Path $HOME $profileName
        $existing = if (Test-Path $pPath) { Get-Content $pPath -Raw } else { "" }
        if ($existing -notlike "*$posixScripts*") {
            Add-Content -Path $pPath -Value $bashExport -Encoding utf8
            Write-Host "✓ Configured Git Bash profile: $pPath" -ForegroundColor Green
        }
    }
} catch { }

$thoth = Get-Command thoth -ErrorAction SilentlyContinue
if (-not $thoth) {
    foreach ($cand in @((Join-Path $userScripts "thoth.exe"), (Join-Path $sysScripts "thoth.exe"))) {
        if (Test-Path $cand) { $thoth = $cand; break }
    }
}

# Copy thoth.exe to WindowsApps for instant PATH availability across all active terminals
$winApps = Join-Path $env:LOCALAPPDATA "Microsoft\WindowsApps"
if (Test-Path $winApps) {
    $srcExe = if ($thoth -is [System.Management.Automation.CommandInfo]) { $thoth.Source } else { [string]$thoth }
    if ($srcExe -and (Test-Path $srcExe)) {
        try {
            Copy-Item $srcExe -Destination (Join-Path $winApps "thoth.exe") -Force -ErrorAction SilentlyContinue
            Write-Host "✓ Copied thoth to $winApps (immediately available in all terminals)" -ForegroundColor Green
        } catch { }
    }
}

if (-not $thoth) {
    Write-Host "thoth entry point not found on PATH — check pip output above." -ForegroundColor Red
    exit 1
}
$thothPath = if ($thoth -is [System.Management.Automation.CommandInfo]) { $thoth.Source } else { [string]$thoth }
Write-Host "thoth: $thothPath"

if (-not $NoDaemon) {
    $taskName = "Thoth"
    $action = New-ScheduledTaskAction -Execute $thothPath -Argument "daemon"
    $trigger = New-ScheduledTaskTrigger -AtLogOn
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries `
        -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1) -ExecutionTimeLimit ([TimeSpan]::Zero)
    $registered = $false
    try {
        Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger `
            -Settings $settings -Description "Thoth device daemon (local sensor API + Brain heartbeat)" -Force -ErrorAction Stop | Out-Null
        Start-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
        Write-Host "✓ thoth daemon registered as logon task '$taskName' and started" -ForegroundColor Green
        $registered = $true
    } catch {
        try {
            $startupDir = [System.IO.Path]::Combine($env:APPDATA, "Microsoft\Windows\Start Menu\Programs\Startup")
            if (Test-Path $startupDir) {
                $cmdFile = Join-Path $startupDir "thoth.cmd"
                "@start `"`" `"$thothPath`" daemon" | Out-File -FilePath $cmdFile -Encoding ascii
                Write-Host "✓ thoth daemon added to Startup folder ($cmdFile)" -ForegroundColor Green
                $registered = $true
            }
        } catch { }
        if (-not $registered) {
            Write-Host "Note: To register scheduled logon task, run PowerShell as Administrator. You can run 'thoth daemon' directly." -ForegroundColor Yellow
        }
    }
}

if (-not $NoSsh) {
    Enable-SshServer
}

Write-Host ""
Write-Host "Supported Terminals:" -ForegroundColor Cyan
Write-Host "  - Windows PowerShell 5.1 / PowerShell 7+"
Write-Host "  - Windows Terminal"
Write-Host "  - Git Bash (C:\Program Files\Git\bin\bash.exe)"
Write-Host "  - Command Prompt (cmd.exe)"
Write-Host ""
Write-Host "Done. Next steps in your terminal (PowerShell, CMD, or Git Bash):" -ForegroundColor Cyan
Write-Host "  thoth pair                # claim this computer as a device"
Write-Host "  thoth status              # node + account status"
Write-Host "  thoth sensors             # list detected sensors"
Write-Host ""
Write-Host "Local Dashboard Access:" -ForegroundColor Cyan
Write-Host "  http://localhost:5000"
Write-Host ""
Write-Host "Local SDK check (no pairing needed):"
Write-Host "  python -c `"import whispy; print([s.id for s in whispy.local().sensors()])`""
