[![Travis](https://img.shields.io/travis/nithinpeter/react-sort.svg)]()

# React Sort

This ReactSort compoent will help you render react components in a sorted manner.

### Installation

```
npm install --save react-sort-component

or

yarn add react-sort-component (If you are using Yarn)
```

### Usage

```
import ReactSort from 'react-sort';

<ReactSort 
    dataSource={[{ name: "messi", age: 25}, { name: "nithin", age: 12 }]}
    sortOptions={{ sortField: "age", sortDir: "des" }} >     
        { (props) => <div>{props.name} - {props.age}</div> }
</ReactSort>
```

ReactSort component gives you full control over how you build your UI. It is just a pure functional component to which you have to pass few props for it to work. 

### Props

| Name         |   required    |  description |
|--------------|:-------------:|:------------------------|
| dataSource   |  true         | Array of objects        |
| sortOptions  |  true         | ```{ sortField: string, sortDir: 'asc'|'des', isCaseSensitive: boolean(optional, defaut = false) }```|
| renderHeader |  false        | Function which receives three arguements and returns the custom header you specify. ```(utils, sortOptions, dataSource) => <Header />```|