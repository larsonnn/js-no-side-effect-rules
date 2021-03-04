const humans = [{ name: "Yeff" }, { name: "Carlton" }, { name: "Sophie" }];
const humansAsObj = {
  humans: [{ name: "Yeff" }, { name: "Carlton" }, { name: "Sophie" }],
};
const listNames = (list) => {
  let c = list.length;
  let listOfAllNames = [];
  while (c--) listOfAllNames.push(list[c].name);
  return listOfAllNames;
};

function* gen(list) {
  let c = list.length;
  while (c--) {
    yield list[c].name;
  }
}
console.log(listNames(humans));
const nameGenerator = gen(humans);
console.log(nameGenerator.next().value);
console.log(nameGenerator.next().value);
console.log(nameGenerator.next().value);

// we copy the input and can't destroy it.
const newNameForItems = (list) => {
  const newList = [...list];
  newList.map((item) => (item.name = "new Name"));
  return newList;
};
console.log(newNameForItems(humans));

// when working in big structures and with other developers this can help you, when you not quite understand what is happening.
const fromSomeoneElse = (list) => {
  list.humans.map((item) => (item.name = "new Name"));
  return list;
};
console.log(fromSomeoneElse(Object.assign({}, humansAsObj)));
const cp = (obj) => {
  return typeof obj === "object"
    ? Array.isArray(obj)
      ? [...obj]
      : Object.assign({}, obj)
    : obj;
};

const copyOfHumans = cp(humans);
console.log(copyOfHumans);

const dollarTo = (currency) => {
  return (dollar) => {
    switch (currency) {
      case "EUR":
        return dollar * 0.83;
      case "YEN":
        return dollar * 107.4;
      default:
        return null;
    }
  };
};

const dollarToEur = dollarTo("EUR");
console.log(dollarTo("YEN")(100));
console.log(dollarToEur(100));
