function* getPage(pageSize = 1, list) {
  let output = [];
  let index = 0;

  while (index < list.length) {
      output = [];
      for (let i = index; i < index + pageSize; i++) {
          if (list[i]) {
              output.push(list[i]);
          }
      }
      console.log("output ==>", output);
      yield output;
      console.log("index before ==>", index)
      index += pageSize;
      console.log("index after ==>", index)

  }
}

list = [1, 2, 3, 4, 5, 6, 7, 8]

var page = getPage(3, list);              // Generator { }

page.next();                              
// page.next();                              
// page.next();  