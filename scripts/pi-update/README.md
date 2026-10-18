# Raspberry Pi weekly update

Installs updates then reboots, Sundays 03:00. Logs: `/var/log/pi-update/pi-update.log`, rotated weekly, 5 rotations kept.

```sh
sudo install -m 755 pi-update.sh /usr/local/sbin/pi-update.sh
sudo install -m 644 pi-update.logrotate /etc/logrotate.d/pi-update
sudo install -m 644 pi-update.cron /etc/cron.d/pi-update
```

Test with `sudo /usr/local/sbin/pi-update.sh` (it will reboot). Note: the logrotate run (daily, via system timer) rotates weekly.
