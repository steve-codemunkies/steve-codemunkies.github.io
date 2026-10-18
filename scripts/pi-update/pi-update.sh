#!/usr/bin/env bash
# Unattended apt upgrade followed by reboot for Debian-based Raspberry Pi.
# Logs to /var/log/pi-update/pi-update.log (rotated by logrotate).
set -uo pipefail

LOG_DIR=/var/log/pi-update
LOG_FILE="$LOG_DIR/pi-update.log"
LOCK_FILE=/var/lock/pi-update.lock

if [[ $EUID -ne 0 ]]; then
  echo "Must be run as root" >&2
  exit 1
fi

mkdir -p "$LOG_DIR"
exec >>"$LOG_FILE" 2>&1

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S%z')] $*"; }

exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  log "Another update is already running; exiting."
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
export NEEDRESTART_MODE=a
APT_OPTS=(-y -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold)

log "Starting package update"
if ! apt-get update; then
  log "apt-get update failed; not rebooting."
  exit 1
fi
if ! apt-get "${APT_OPTS[@]}" full-upgrade; then
  log "apt-get full-upgrade failed; not rebooting."
  exit 1
fi
apt-get -y autoremove --purge || log "autoremove failed (continuing)"
apt-get -y autoclean || log "autoclean failed (continuing)"

log "Update complete; rebooting"
sync
exec /sbin/shutdown -r now "Weekly package update complete"
