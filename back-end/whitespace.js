value={item} onChange={clickItem}



const clickItem = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    // setActiveItem(e.target.value)
}
