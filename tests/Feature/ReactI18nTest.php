<?php

namespace Tests\Feature;

use Tests\TestCase;

class ReactI18nTest extends TestCase
{
    /**
     * Test that translation files exist
     */
    public function testTranslationFilesExist()
    {
        $locales = ['en', 'fr', 'es'];
        $files = ['translation.json'];
        
        foreach ($locales as $locale) {
            foreach ($files as $file) {
                $path = public_path("locales/{$locale}/{$file}");
                $this->assertFileExists($path, "Translation file missing: locales/{$locale}/{$file}");
            }
        }
    }
    
    /**
     * Test that translation files are valid JSON
     */
    public function testTranslationFilesAreValidJson()
    {
        $locales = ['en', 'fr', 'es'];
        $files = ['translation.json'];
        
        foreach ($locales as $locale) {
            foreach ($files as $file) {
                $path = public_path("locales/{$locale}/{$file}");
                $content = file_get_contents($path);
                $json = json_decode($content, true);
                
                $this->assertNotNull($json, "Invalid JSON in: locales/{$locale}/{$file}");
                $this->assertEquals(JSON_ERROR_NONE, json_last_error(), "JSON error in: locales/{$locale}/{$file}");
            }
        }
    }
    
    /**
     * Test that all locales have the same translation keys
     */
    public function testAllLocalesHaveSameKeys()
    {
        $enPath = public_path('locales/en/translation.json');
        $frPath = public_path('locales/fr/translation.json');
        $esPath = public_path('locales/es/translation.json');
        
        $enJson = json_decode(file_get_contents($enPath), true);
        $frJson = json_decode(file_get_contents($frPath), true);
        $esJson = json_decode(file_get_contents($esPath), true);
        
        $enKeys = $this->extractKeys($enJson);
        $frKeys = $this->extractKeys($frJson);
        $esKeys = $this->extractKeys($esJson);
        
        // Check French has all English keys
        $missingInFr = array_diff($enKeys, $frKeys);
        $this->assertEmpty($missingInFr, 'Missing keys in French: ' . implode(', ', $missingInFr));
        
        // Check Spanish has all English keys
        $missingInEs = array_diff($enKeys, $esKeys);
        $this->assertEmpty($missingInEs, 'Missing keys in Spanish: ' . implode(', ', $missingInEs));
    }
    
    /**
     * Test that i18n configuration file exists
     */
    public function testI18nConfigExists()
    {
        $path = resource_path('js/i18n.js');
        $this->assertFileExists($path, 'i18n.js configuration file is missing');
    }
    
    /**
     * Test that LanguageContext exists
     */
    public function testLanguageContextExists()
    {
        $path = resource_path('js/contexts/LanguageContext.jsx');
        $this->assertFileExists($path, 'LanguageContext.jsx is missing');
    }
    
    /**
     * Test that LanguageSwitcher component exists
     */
    public function testLanguageSwitcherExists()
    {
        $path = resource_path('js/components/LanguageSwitcher.jsx');
        $this->assertFileExists($path, 'LanguageSwitcher.jsx component is missing');
    }
    
    /**
     * Test that API locale utility exists
     */
    public function testApiLocaleUtilityExists()
    {
        $path = resource_path('js/utils/apiLocale.js');
        $this->assertFileExists($path, 'apiLocale.js utility is missing');
    }
    
    /**
     * Test that i18n formatters utility exists
     */
    public function testI18nFormattersExists()
    {
        $path = resource_path('js/utils/i18nFormatters.js');
        $this->assertFileExists($path, 'i18nFormatters.js utility is missing');
    }
    
    /**
     * Test that dashboard.tsx includes i18n provider
     */
    public function testDashboardIncludesI18nProvider()
    {
        $path = resource_path('js/dashboard.tsx');
        $content = file_get_contents($path);
        
        $this->assertStringContainsString('I18nextProvider', $content, 'dashboard.tsx should include I18nextProvider');
        $this->assertStringContainsString('LanguageProvider', $content, 'dashboard.tsx should include LanguageProvider');
        $this->assertStringContainsString("import i18n from './i18n'", $content, 'dashboard.tsx should import i18n');
    }
    
    /**
     * Test that updated components use useTranslation hook
     */
    public function testComponentsUseTranslation()
    {
        // Check Footer component
        $footerPath = resource_path('js/components/site/Footer.jsx');
        if (file_exists($footerPath)) {
            $content = file_get_contents($footerPath);
            $this->assertStringContainsString('useTranslation', $content, 'Footer.jsx should use useTranslation hook');
            $this->assertStringContainsString('const { t } = useTranslation()', $content, 'Footer.jsx should destructure t from useTranslation');
        }
        
        // Check ClientInfoStep component
        $clientInfoPath = resource_path('js/components/site/ClientInfoStep.jsx');
        if (file_exists($clientInfoPath)) {
            $content = file_get_contents($clientInfoPath);
            $this->assertStringContainsString('useTranslation', $content, 'ClientInfoStep.jsx should use useTranslation hook');
            $this->assertStringContainsString('const { t } = useTranslation()', $content, 'ClientInfoStep.jsx should destructure t from useTranslation');
        }
    }
    
    /**
     * Extract all keys from nested JSON structure
     */
    private function extractKeys($array, $prefix = '')
    {
        $keys = [];
        
        foreach ($array as $key => $value) {
            $fullKey = $prefix ? "{$prefix}.{$key}" : $key;
            
            if (is_array($value)) {
                $keys = array_merge($keys, $this->extractKeys($value, $fullKey));
            } else {
                $keys[] = $fullKey;
            }
        }
        
        return $keys;
    }
}