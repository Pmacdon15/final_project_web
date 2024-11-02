const operatorsMap = {
    eq: (a, b) => a === b,
    gt: (a, b) => a > b,
    ge: (a, b) => a >= b,
    lt: (a, b) => a < b,
    le: (a, b) => a <= b
};

/* Filter logic */
function filterPrograms(programs, searchedName, searchedLength) {
    const filteredPrograms = programs.filter(el => {
        let matchesCriteria = false;

        if (el.name.toLocaleLowerCase().includes(searchedName)) {
            matchesCriteria = true;
        }

        if (searchedLength?.value) {
            /* 
                Mapping a function based on the selected operator.
                The returned function will be evaluated in the if block below.
            */

            if (
                operatorsMap[searchedLength.operator](
                    el.durationTerms,
                    Number(searchedLength.value)
                )
            ) {
                //Evaluate the previous value, after program name validation, AND this validation return.
                matchesCriteria = matchesCriteria && true;
            } else {
                matchesCriteria = matchesCriteria && false;
            }
        }

        return matchesCriteria;
    });

    return filteredPrograms;
}

export default filterPrograms;
