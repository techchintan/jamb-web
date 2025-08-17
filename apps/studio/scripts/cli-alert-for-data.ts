function main() {
  const blue = "\x1b[34m";
  const cyan = "\x1b[36m";
  const reset = "\x1b[0m";
  const boxLines = [
    "",
    `${blue}┌────────────────────────────────────────────────────────────────────────────┐${reset}`,
    `${blue}│  To import the provided seed data into your Sanity dataset, run:           │${reset}`,
    `${blue}│                                                                            │${reset}`,
    `${blue}│    ${cyan}npx sanity dataset import seed-data.tar.gz <TARGET_DATASET>${blue}             │${reset}`,
    `${blue}│                                                                            │${reset}`,
    `${blue}│  Example:                                                                  │${reset}`,
    `${blue}│    ${cyan}npx sanity dataset import seed-data.tar.gz production --replace${blue}         │${reset}`,
    `${blue}└────────────────────────────────────────────────────────────────────────────┘${reset}`,
    "",
    `${blue}For more info, run: npx sanity dataset import --help${reset}`,
    "",
  ];
  for (const line of boxLines) console.log(line);
}

main();
