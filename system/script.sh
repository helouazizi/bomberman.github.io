#!/bin/bash

echo "==============================="
echo "🧠 System Information"
echo "==============================="
hostnamectl
echo ""

echo "==============================="
echo "📦 Checking for Updates"
echo "==============================="
sudo apt update -qq
sudo apt list --upgradable 2>/dev/null
echo ""

echo "==============================="
echo "💾 Disk Usage"
echo "==============================="
df -h --total | grep total
echo ""

echo "==============================="
echo "🔥 Top 5 Memory-Heavy Processes"
echo "==============================="
ps aux --sort=-%mem | head -n 6
echo ""

echo "✅ Done!"
