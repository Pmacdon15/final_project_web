import React from 'react';
import { ProgramForm } from '../../admin-portal/all-programs/AddPrograms.component'
import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import DisplayProgram from './DisplayProgram.component';
import filterPrograms from '../../../utils/search-filter';

export default function DisplayAllPrograms({ programs, onEdit, onDelete, isAdmin }) {
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
                {programs.map((program) => (
                    <div key={program.id}>
                        <div>
                            {isAdmin &&
                                <>
                                    <button onClick={() => onEdit(program)} className="btn btn-secondary">Edit</button>
                                    <button onClick={() => onDelete(program.id)} className="btn btn-danger">Delete</button>
                                </>
                            }
                        </div>
                        <DisplayProgram program={program} />
                    </div>
                ))}
            </div>
        </>
    );
}
