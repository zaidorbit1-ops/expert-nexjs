#!/bin/bash

# Expert Assignment Writers UK - Setup Script
# This script installs dependencies for the Next.js and Supabase project

echo "🚀 Installing Expert Assignment Writers UK Website..."
echo ""

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "📝 Next steps:"
    echo "  1. Copy .env.example to .env.local and configure Supabase values"
    echo "  2. Run supabase/schema.sql in the Supabase SQL Editor"
    echo "  3. Start the development server: npm run dev"
    echo "  4. Open http://localhost:3000 in your browser"
    echo ""
    echo "🎨 Customization:"
    echo "  - Colors: Edit tailwind.config.js"
    echo "  - Content: Edit components in src/components/ and src/site-pages/"
    echo "  - Images: Add to public/ folder"
    echo ""
    echo "📚 Build for production: npm run build"
    echo ""
else
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
