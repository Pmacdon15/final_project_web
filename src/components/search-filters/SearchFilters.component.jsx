import {
    Box,
    FormControl,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';

function SearchFilters({
    searchByName,
    setSearchByName,
    searchByLength = undefined,
    setSearchByLength = undefined
}) {
    function handleSearchByLength(typedByUser) {
        const parsed = Number(typedByUser.target.value);

        if (!setSearchByLength) {
            return;
        } else if (isNaN(parsed) || parsed === 0) {
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
        if (!setSearchByLength) {
            return;
        } else {
            setSearchByLength(oldState => ({
                ...oldState,
                operator: selectedByUser.target.value
            }));
        }
    }

    return (
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
                    {searchByLength ? (
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
                    ) : null}
                </Stack>
            </Box>
        </div>
    );
}
export default SearchFilters;
