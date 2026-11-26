tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                display: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['Newsreader', 'Georgia', 'serif'],
                mono: ['"JetBrains Mono"', 'monospace'],
            },
            colors: {
                editorial: {
                    paper: '#FAF8F5',
                    paperElevated: '#F2EFE9',
                    ink: '#18181B',
                    muted: '#57534E',
                    accent: '#C85A32',
                    rule: '#E5E0D8',
                    slate: '#0F1115',
                    slateElevated: '#161920',
                    slateInk: '#E4E4E7',
                    slateMuted: '#9CA3AF',
                    slateAccent: '#F27D52',
                    slateRule: '#262A34',
                }
            }
        }
    }
};
