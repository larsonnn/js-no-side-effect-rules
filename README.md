# !side-effects in JavaScript, (NodeJS && Browser)

> Its often written down. But I just want to share what in my opinion is key to build an application without to worry about side effects.
> 
## these are some simple rules that I use to avoid side effects and do a better programming
<br>
<br>
<br>

### 1. don't mutate inputs. Inputs should be read only
### 2. only use Inputs for gaining Data in functions. Never access via global  variable
### 3. don't use let or var if possible
   1. if not, scope it in functions
```js 
const listNames = list => {
    let c = list.length;
    let listOfAllNames = [];
    while(c--)
        listOfAllNames.push(list[c].name);
    return listOfAllNames;
}

function* gen(list) {
    let c = list.length;
    while(c--){
        yield list[c].name;
    }
}
```
### 4. copy if possible
There are more then one solution:

```js
// we copy the input and can't destroy it.
const newNameForItems = list => {
    const newList = [...list];
    newList.map(item => item.name = 'new Name');
    return newList;
}
console.log(newNameForItems(humans));
```

```js
// when working in big structures and with other developers this can help you, when you not quite understand what is happening.
const fromSomeoneElse = list => {
    list.map(item => item.name = 'new Name');
    return list;
}
fromSomeoneElse(Object.assign({}, list));
```


copy function as shortcut
```js
const cp = obj => {
    return typeof obj === "object" ?
        Array.isArray(obj) ? 
            [...obj] 
            : Object.assign({}, obj) 
        : obj
}

const copyOfList = cp(list);
```

### 5. use curry
```js
const dollarTo = currency => {
	return (dollar) => {
		switch(currency) {
		    case 'EUR':
			return dollar * 0.83;
		    case 'YEN':
			return dollar * 107.40;
		    default:
			return null;
		}
  	}
}
const dollarToEur = dollarTo("EUR");
dollarTo("YEN")(100); // 10740
dollarToEur(100); // 83
```

### 6. don't install packages with a big dependency list if you can avoid it
   1. Example: microservices often don't need any express/fastify magic
   2. use native [http](https://nodejs.org/api/http.html) or packages like [bunserver](https://www.npmjs.com/package/bunserver)
   3. there is a lot of nice frameworks with a big list of dependencies, and I'm using it too. But if I can avoid them, I write some code of my own.
### 7. be patient.

<br>
<br>

[JSFiddle - example code](https://jsfiddle.net/6pnoe9by/7/)
