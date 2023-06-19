const dynamicSort = function (property) {
   let sortOrder = 1;
   property = property.map(prop => {
      if (prop.startsWith("-")) {
         sortOrder = -1;
         return prop.substr(1);
      } else {
         sortOrder = 1
         return prop
      }
   })

   function getFormatted(value1, value2) {
      return ((value1 || "").trim() + ' ' + (value2 || "").trim())
   }

   return function (a, b) {
      let firstValueA = a[property[0]]
      let secondValueA = a[property[1]]
      let firstValueB = b[property[0]]
      let secondValueB = b[property[1]]
      let result;
      if (property.length > 1) {
         result = (getFormatted(firstValueA, secondValueA) < getFormatted(firstValueB, secondValueB)
            ? -1 : getFormatted(firstValueA, secondValueA) > getFormatted(firstValueB, secondValueB) ? 1 : 0);
      } else {
         result = a[property[0]] < b[property[0]] ? -1 : a[property[0]] > b[property[0]] ? 1 : 0;
      }
      return result * sortOrder;
   }
}
const sortByField = function (sorter = {}, unchangedData = [], isContainsFilterValue, search = "", data = []) {
   let returnArr
   if (sorter.order && sorter.field) {
      let params = [];
      if ((typeof sorter.field == "string")) {
         params.push(sorter.order === "descend" ? `-${sorter.field}` : sorter.field)
      } else {
         params = [...sorter.field.map(f => sorter.order === "descend" ? `-${f}` : f)]
      }
      returnArr = data.sort(dynamicSort(params))
   } else {
      returnArr = Object.assign([], unchangedData)
      if (!!search) returnArr = returnArr.filter(d => isContainsFilterValue(d, search))
   }
   return returnArr
}

export {dynamicSort, sortByField}