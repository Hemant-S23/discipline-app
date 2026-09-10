# Discipline — Android APK & GitHub Build Guide

Aapki application successfully **Capacitor Android Project** me convert ho chuki hai!
Yeh guide follow karke aap agle 5 minute me apni ready-to-install **`Discipline-v1.0.apk`** download kar sakte hain.

---

## Step 1: GitHub par New Repository Banayein
1. [github.com](https://github.com/) par jayein aur **New repository** par click karein.
2. Repository ka naam rakhein: `discipline` ya `discipline-app`.
3. Isko **Private** ya **Public** (jo aap chahein) rakh sakte hain.
4. **Create repository** par click karein.

---

## Step 2: Code ko GitHub par Push Karein
Apne computer ke terminal / powershell me yeh commands chalayein (usi folder `d:\HS\Discipline` ke andar):

```bash
git init
git add .
git commit -m "Initialize Discipline Capacitor Android App"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git push -u origin main
```
*(Yahan `<YOUR_GITHUB_USERNAME>` aur `<YOUR_REPO_NAME>` ko apne GitHub link se replace karein).*

---

## Step 3: APK Download Karein
1. GitHub par apni repository open karein.
2. Upar **"Actions"** tab par click karein.
3. Wahan **"Build Discipline Android APK"** workflow run hota hua dikhega (3–4 minute lega).
4. Jab green checkmark ✅ aa jaye, to workflow run par click karein.
5. Bottom me **Artifacts** section ke andar **`Discipline-Android-APK`** ka download link milega.
6. Click karke download karein, extract karein, aur **`Discipline-v1.0.apk`** ko apne Android phone me install karein!

---

## Features Configured in this Android App:
- **Package ID:** `com.discipline.app` (Google Play Store ready)
- **App Name:** `Discipline`
- **Native Android Icons:** Automatic HD icons in all mipmap densities
- **Notification Support:** Local reminders, exact alarms, boot receivers configured
- **Haptic Vibration:** Native feedback enabled on habit check-ins
- **Status Bar:** Sleek dark mode styling (`#08090A`)
