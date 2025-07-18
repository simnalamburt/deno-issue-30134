## Reproduction for [denoland/deno#30314]

```bash
# Try huge-project first
cd huge-project
deno run -A index.ts
cd ..

# Then build tiny-project
cd tiny-project
deno compile index.ts

# Now you get huge binary
ls -alh tiny-project
```

[denoland/deno#30314]: https://github.com/denoland/deno/issues/30134
