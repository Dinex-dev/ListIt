import esbuild from 'esbuild'
import manifestPlugin from 'esbuild-plugin-manifest'
import htmlPlugin from '@chialab/esbuild-plugin-html';


const ctx = await esbuild.context({
    entryPoints: ['src/popup.html', 'src/scripts/background.ts', 'src/scripts/inject.ts', 'src/scripts/script.ts', 'src/scripts/content.ts'],
    bundle: true,
    outdir: 'dist/',
    plugins: [
        htmlPlugin()
    ],
    tsconfig: 'tsconfig.json',
})

await ctx.watch()
