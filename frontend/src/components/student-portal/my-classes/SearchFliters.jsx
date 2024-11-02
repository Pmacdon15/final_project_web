import { Box, Stack, TextField } from '@mui/material';

export default function SearchFilters({ searchByName, setSearchByName }) {
    return (
        <Box
            className="w-full "
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
                },

                input: {
                    borderRadius: '0.25rem'
                }
            }}
        >
            <Stack spacing={2} direction="row">
                <TextField
                    color="black"
                    id="search-by-name"
                    label="Class Name"
                    value={searchByName}
                    onChange={typedByUser => {
                        setSearchByName(
                            typedByUser.target.value.toLocaleLowerCase()
                        );
                    }}
                    sx={{ flex: 1 }}
                    className="p-2 rounded-lg"
                />
            </Stack>
        </Box>

    );
}