import React from 'react';
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import DisplayProgram from './DisplayProgram.component';

/* Declared outside the function to avoid unnecessary recreations due rerenders */
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

        if (searchedLength.value) {
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

export default function DisplayAllPrograms({ programs, email }) {
    const [searchByName, setSearchByName] = React.useState('');
    const [searchByLength, setSearchByLength] = React.useState({
        value: '',
        operator: 'eq'
    });

    function handleSearchByLength(typedByUser) {
        const parsed = Number(typedByUser.target.value);

        if (isNaN(parsed) || parsed === 0) {
            setSearchByLength(oldState => ({
                ...oldState,
                value: ''
            }));
        } else {
            setSearchByLength(oldState => ({
                ...oldState,
                value: parsed
            }));
        }
    }

    function handleOperatorSelect(selectedByUser) {
        setSearchByLength(oldState => ({
            ...oldState,
            operator: selectedByUser.target.value
        }));
    }

    const filteredPrograms = filterPrograms(
        programs,
        searchByName,
        searchByLength
    );

    return (
        <>
            <div className="bg-blue-200 w-full md:w-4/6 shadow-lg h-5/6 gap-4 p-2 md:p-4 border rounded-lg ">
                <Box
                    component="fieldset"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',

                        '> legend': {
                            textAlign: 'left',
                            fontWeight: 'bold',
                            marginBottom: '.5rem'
                        },

                        'div > div': {
                            background: 'white'
                        }
                    }}
                >
                    <Stack spacing={2} direction="row">
                        <TextField
                            color="black"
                            id="search-by-name"
                            label="Program Name"
                            value={searchByName}
                            onChange={typedByUser => {
                                setSearchByName(
                                    typedByUser.target.value.toLocaleLowerCase()
                                );
                            }}
                            sx={{ flex: 1 }}
                        />
                        <div>
                            <FormControl>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={searchByLength.operator}
                                    onChange={handleOperatorSelect}
                                >
                                    <MenuItem value={'eq'}>{'='}</MenuItem>
                                    <MenuItem value={'le'}>{'<='}</MenuItem>
                                    <MenuItem value={'lt'}>{'<'}</MenuItem>
                                    <MenuItem value={'ge'}>{'>='}</MenuItem>
                                    <MenuItem value={'gt'}>{'>'}</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                color="black"
                                id="search-by-length"
                                label="Program Length"
                                type="number"
                                value={searchByLength.value}
                                onChange={handleSearchByLength}
                            />
                        </div>
                    </Stack>
                </Box>
            </div>

            <div className="flex flex-col w-full md:w-4/6 bg-blue-100  shadow-lg gap-4   p-4 md:p-8 border rounded-lg mb-8">
                {filteredPrograms.length === 0 ? (
                    <div>No data to load</div>
                ) : (
                    filteredPrograms.map((program, index) => (
                        <DisplayProgram
                            key={index}
                            program={program}
                            email={email}
                        />
                    ))
                )}
            </div>
        </>
    );
}
