const { chromium } = require('playwright');
const fs = require('fs');

async function investigateNavbar() {
    console.log('🔍 Starting navbar investigation...');
    
    const browser = await chromium.launch({ 
        headless: false, // Show browser for debugging
        slowMo: 1000 // Slow down operations
    });
    
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 }
    });
    
    const page = await context.newPage();
    
    // Enable console logging
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error));
    
    try {
        console.log('📍 Navigating to localhost:8000...');
        
        // Navigate to the page but don't wait for all resources
        await page.goto('http://localhost:8000', { 
            waitUntil: 'domcontentloaded',
            timeout: 10000 
        });
        
        // Wait a moment for initial render
        await page.waitForTimeout(500);
        
        console.log('📸 Taking initial screenshot...');
        await page.screenshot({ 
            path: '/home/ayoub/Pictures/Screenshots/navbar_initial.png',
            fullPage: false 
        });
        
        // Get initial navbar styles
        console.log('🎨 Inspecting initial navbar styles...');
        const initialNavbarInfo = await page.evaluate(() => {
            const navbar = document.querySelector('.nav-container');
            const body = document.body;
            const site = document.querySelector('.site');
            
            if (!navbar) return { error: 'Navbar not found' };
            
            const computedStyle = window.getComputedStyle(navbar);
            return {
                navbar: {
                    backgroundColor: computedStyle.backgroundColor,
                    position: computedStyle.position,
                    top: computedStyle.top,
                    zIndex: computedStyle.zIndex,
                    boxShadow: computedStyle.boxShadow,
                    classes: navbar.className,
                },
                body: {
                    classes: body.className,
                },
                site: site ? {
                    classes: site.className,
                } : null,
                hasReactMounted: !!document.querySelector('[data-reactroot]') || !!document.querySelector('#home_root > div')
            };
        });
        
        console.log('Initial navbar state:', JSON.stringify(initialNavbarInfo, null, 2));
        
        // Wait for React to potentially load and modify styles
        console.log('⏳ Waiting for React to potentially load...');
        
        // Wait for React components to mount
        try {
            await page.waitForFunction(() => {
                // Check if any React components have mounted
                const reactRoots = document.querySelectorAll('[data-reactroot], #home_root > div, .react-component');
                return reactRoots.length > 0;
            }, { timeout: 5000 });
            console.log('✅ React components detected');
        } catch (e) {
            console.log('⚠️ No React components detected within 5 seconds');
        }
        
        // Wait additional time for any style changes
        await page.waitForTimeout(2000);
        
        console.log('📸 Taking after-React screenshot...');
        await page.screenshot({ 
            path: '/home/ayoub/Pictures/Screenshots/navbar_after_react.png',
            fullPage: false 
        });
        
        // Get navbar styles after React loads
        console.log('🎨 Inspecting navbar styles after React...');
        const afterReactNavbarInfo = await page.evaluate(() => {
            const navbar = document.querySelector('.nav-container');
            const body = document.body;
            const site = document.querySelector('.site');
            
            if (!navbar) return { error: 'Navbar not found' };
            
            const computedStyle = window.getComputedStyle(navbar);
            return {
                navbar: {
                    backgroundColor: computedStyle.backgroundColor,
                    position: computedStyle.position,
                    top: computedStyle.top,
                    zIndex: computedStyle.zIndex,
                    boxShadow: computedStyle.boxShadow,
                    classes: navbar.className,
                },
                body: {
                    classes: body.className,
                },
                site: site ? {
                    classes: site.className,
                } : null,
                hasReactMounted: !!document.querySelector('[data-reactroot]') || !!document.querySelector('#home_root > div'),
                reactComponents: Array.from(document.querySelectorAll('[data-reactroot], #home_root > div')).length
            };
        });
        
        console.log('After React navbar state:', JSON.stringify(afterReactNavbarInfo, null, 2));
        
        // Compare the states
        console.log('\n🔍 COMPARISON ANALYSIS:');
        console.log('=======================');
        
        if (initialNavbarInfo.navbar && afterReactNavbarInfo.navbar) {
            const changes = {};
            
            Object.keys(initialNavbarInfo.navbar).forEach(key => {
                if (initialNavbarInfo.navbar[key] !== afterReactNavbarInfo.navbar[key]) {
                    changes[key] = {
                        before: initialNavbarInfo.navbar[key],
                        after: afterReactNavbarInfo.navbar[key]
                    };
                }
            });
            
            if (Object.keys(changes).length > 0) {
                console.log('🚨 NAVBAR CHANGES DETECTED:');
                console.log(JSON.stringify(changes, null, 2));
            } else {
                console.log('✅ No navbar style changes detected');
            }
        }
        
        // Check for body class changes
        if (initialNavbarInfo.body?.classes !== afterReactNavbarInfo.body?.classes) {
            console.log('🚨 BODY CLASS CHANGES:');
            console.log(`Before: ${initialNavbarInfo.body?.classes}`);
            console.log(`After: ${afterReactNavbarInfo.body?.classes}`);
        }
        
        // Check for site class changes
        if (initialNavbarInfo.site?.classes !== afterReactNavbarInfo.site?.classes) {
            console.log('🚨 SITE CLASS CHANGES:');
            console.log(`Before: ${initialNavbarInfo.site?.classes}`);
            console.log(`After: ${afterReactNavbarInfo.site?.classes}`);
        }
        
        // Check what JavaScript files are loaded
        console.log('\n📋 LOADED SCRIPTS:');
        const scripts = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('script[src]')).map(s => s.src);
        });
        scripts.forEach(script => console.log(script));
        
        // Check for any CSS modifications
        console.log('\n🎨 CSS ANALYSIS:');
        const cssAnalysis = await page.evaluate(() => {
            const allStylesheets = Array.from(document.styleSheets);
            const inlineStyles = Array.from(document.querySelectorAll('style'));
            
            return {
                stylesheetCount: allStylesheets.length,
                inlineStyleCount: inlineStyles.length,
                inlineStyleContent: inlineStyles.map(style => style.textContent?.substring(0, 200) + '...')
            };
        });
        
        console.log('CSS Analysis:', JSON.stringify(cssAnalysis, null, 2));
        
        // Save detailed report
        const report = {
            timestamp: new Date().toISOString(),
            initialState: initialNavbarInfo,
            afterReactState: afterReactNavbarInfo,
            loadedScripts: scripts,
            cssAnalysis: cssAnalysis
        };
        
        fs.writeFileSync('/home/ayoub/Pictures/Screenshots/navbar_investigation_report.json', 
                         JSON.stringify(report, null, 2));
        
        console.log('\n✅ Investigation complete! Check the screenshots and report.');
        console.log('Screenshots saved to: /home/ayoub/Pictures/Screenshots/');
        console.log('Report saved to: /home/ayoub/Pictures/Screenshots/navbar_investigation_report.json');
        
    } catch (error) {
        console.error('❌ Error during investigation:', error);
        
        // Take emergency screenshot
        try {
            await page.screenshot({ 
                path: '/home/ayoub/Pictures/Screenshots/navbar_error.png',
                fullPage: true 
            });
        } catch (screenshotError) {
            console.error('Failed to take error screenshot:', screenshotError);
        }
    } finally {
        await browser.close();
    }
}

// Run the investigation
investigateNavbar().catch(console.error);