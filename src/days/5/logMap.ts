export const logMap = (map: number[][]) => {
  // eslint-disable-next-line no-console
  console.log(
    map
      .map((row) => {
        const denseRow = [];

        for (let i = 0; i < row.length; i++) {
          denseRow.push(row[i]?.toString() ?? '.');
        }

        return denseRow.join('');
      })
      .join('\n'),
  );
};
