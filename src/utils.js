export const colorVoteAverage = (average) => {
  if (average < 3) return 'voteAverageThree voteAverage';
  if (average < 5) return 'voteAverageFive voteAverage';
  if (average < 7) return 'voteAverageSeven voteAverage';
  return 'voteAverageMax voteAverage';
};

export function arrayGenres(arr, id) {
   const newArray = [];
   for (let j = 0; j < 2; j++) {
     for (let i = 0; i < arr.length; i++) {
       if (id[j] === arr[i].id) newArray.push(arr[i].name);
     }
   }
   if (newArray.length === 0) return '...';
   return newArray.map((elem) => ({elem}));
}
 
export const shortText = (longText, maxLength) => {
  const dots = '...';
  const pos = longText.indexOf(' ', maxLength);
  return pos === -1 ? longText : longText.substr(0, pos) + dots;
};

 export const debounce = (fn, debouncTime) => {
   let timeout;
   const args = []
    return function () {
      const fnCall = () => {
        fn.apply(this, ...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, debouncTime);
    };
  };