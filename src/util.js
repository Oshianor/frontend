export const nutralizeTitle = title => {
  return title
    .toLocaleLowerCase()
    .split(" ")
    .join("-")
    .replace(/[.*+?^$/{}()!%#>@=:;'|[\]\\]/g, "");
};
