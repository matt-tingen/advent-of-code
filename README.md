# [Advent of Code 2021](https://adventofcode.com/2021)

## File Structure

For a given day `n`, create a folder `src/days/<n>` with the following files:

- `input.txt` containing your user-specific puzzle input
- `parse.ts` which has a single export of the type `(input: string) => T` where T is any type which makes the input easier to work with e.g. `number[]`
- `a.ts` which has a single export of the type `(input: T) => string | number` where `T` is the type returned by the parse function and the return value is the result for the first puzzle of the day
- `b.ts` which is the same as `a.ts` but for the second puzzle of the day

The `parse.ts` file is optional. If omitted, the functions exported by `a.ts` and `b.ts` will be passed the original input as a `string`.

You may create any other helper files in the day's folder as necessary, including `*.test.ts` files.

## Commands

To run tests, use `yarn test`.

To run a particular puzzle, use `yarn solve [<n>[<a|b>]]` e.g. `yarn solve 1a`. If arguments are omitted, the latest available will be used based on what folders/files exist.
The solution will be printed to the console and copied to the clipboard.

Once you've completed a puzzle successfully, add it to `challenges.test.ts` and run `yarn checks` to create a snapshot test using your custom input.
