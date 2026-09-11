/**
 * Discipline — Native Notifications & Haptics Bridge (Capacitor)
 * Provides local scheduled alarms, habit reminders, and native haptic feedback.
 */
(function() {
  'use strict';

  const DisciplineNative = {
    isNative: false,
    hasNotificationPermission: false,

    async init() {
      if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        this.isNative = true;
        console.log('[DisciplineNative] Running on native platform:', window.Capacitor.getPlatform());
        
        // Configure Status Bar if available
        if (window.Capacitor.Plugins && window.Capacitor.Plugins.StatusBar) {
          try {
            await window.Capacitor.Plugins.StatusBar.setBackgroundColor({ color: '#08090A' });
          } catch (e) {
            console.warn('[DisciplineNative] StatusBar error:', e);
          }
        }

        // Check or request notification permissions
        this.checkPermissions();
      } else {
        console.log('[DisciplineNative] Running in web browser environment.');
      }
    },

    async checkPermissions() {
      if (!this.isNative || !window.Capacitor.Plugins.LocalNotifications) return false;
      try {
        const status = await window.Capacitor.Plugins.LocalNotifications.checkPermissions();
        this.hasNotificationPermission = (status.display === 'granted');
        return this.hasNotificationPermission;
      } catch (err) {
        console.error('[DisciplineNative] Check permissions failed:', err);
        return false;
      }
    },

    async requestPermissions() {
      if (!this.isNative) {
        if ('Notification' in window) {
          const perm = await Notification.requestPermission();
          return perm === 'granted';
        }
        return false;
      }

      if (window.Capacitor.Plugins.LocalNotifications) {
        try {
          const result = await window.Capacitor.Plugins.LocalNotifications.requestPermissions();
          this.hasNotificationPermission = (result.display === 'granted');
          return this.hasNotificationPermission;
        } catch (err) {
          console.error('[DisciplineNative] Request permission error:', err);
          return false;
        }
      }
      return false;
    },

    /**
     * Schedule a recurring daily habit reminder
     * @param {number} id Unique notification ID (integer)
     * @param {string} title Reminder title
     * @param {string} body Reminder message
     * @param {number} hour 0-23
     * @param {number} minute 0-59
     */
    async scheduleDailyReminder(id, title, body, hour, minute) {
      if (!this.isNative || !window.Capacitor.Plugins.LocalNotifications) {
        console.log(`[DisciplineNative Mock] Scheduled daily reminder #${id} at ${hour}:${minute} - "${title}"`);
        return;
      }

      try {
        const granted = await this.requestPermissions();
        if (!granted) {
          console.warn('[DisciplineNative] Notification permission not granted.');
          return;
        }

        // Cancel previous if exists
        await this.cancelReminder(id);

        await window.Capacitor.Plugins.LocalNotifications.schedule({
          notifications: [
            {
              id: Number(id),
              title: title || 'Discipline Habit Reminder',
              body: body || 'Time to complete your habit and protect your streak!',
              schedule: {
                on: {
                  hour: Number(hour),
                  minute: Number(minute)
                },
                repeats: true,
                allowWhileIdle: true
              },
              sound: undefined,
              smallIcon: 'ic_stat_name',
              iconColor: '#6366F1'
            }
          ]
        });
        console.log(`[DisciplineNative] Daily reminder scheduled: ID ${id} at ${hour}:${minute}`);
      } catch (err) {
        console.error('[DisciplineNative] Schedule reminder error:', err);
      }
    },

    /**
     * Trigger an instant test notification
     */
    async sendTestNotification(title = 'Discipline Tracker', body = 'Your habit streak is active! Keep building consistency.') {
      if (!this.isNative || !window.Capacitor.Plugins.LocalNotifications) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(title, { body });
        } else {
          alert(`${title}\n${body}`);
        }
        return;
      }

      try {
        await this.requestPermissions();
        await window.Capacitor.Plugins.LocalNotifications.schedule({
          notifications: [
            {
              id: Math.floor(Math.random() * 10000) + 1,
              title: title,
              body: body,
              schedule: { at: new Date(Date.now() + 1000) },
              smallIcon: 'ic_stat_name',
              iconColor: '#6366F1'
            }
          ]
        });
      } catch (err) {
        console.error('[DisciplineNative] Test notification failed:', err);
      }
    },

    /**
     * Cancel scheduled reminder by ID
     */
    async cancelReminder(id) {
      if (!this.isNative || !window.Capacitor.Plugins.LocalNotifications) return;
      try {
        await window.Capacitor.Plugins.LocalNotifications.cancel({
          notifications: [{ id: Number(id) }]
        });
      } catch (err) {
        console.warn('[DisciplineNative] Cancel reminder warning:', err);
      }
    },

    /**
     * Native Haptic Feedback on habit completion
     */
    async triggerHaptic(style = 'MEDIUM') {
      if (this.isNative && window.Capacitor.Plugins.Haptics) {
        try {
          await window.Capacitor.Plugins.Haptics.impact({ style });
        } catch (e) {
          // ignore
        }
      } else if (navigator.vibrate) {
        navigator.vibrate(20);
      }
    }
  };

  window.DisciplineNative = DisciplineNative;

  // Auto initialize on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DisciplineNative.init());
  } else {
    DisciplineNative.init();
  }
})();
