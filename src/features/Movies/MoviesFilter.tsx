import { FilterOutlined } from "@mui/icons-material";
import { Autocomplete, Button, FormControl, Paper, TextField, debounce } from "@mui/material";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeywordItem, client } from "../../api/tmdb";


export interface Filters {
    keywords: KeywordItem[];
}

interface MoviesFilterProps {
    onApply(filters: Filters): void
}

const MoviesFilter = ({onApply}: MoviesFilterProps) => {

    const [keywordsLoading, setKeywordsLoading] = useState(false);
    const [keywordsOptions, setKeywordsOptions] = useState<KeywordItem[]>([]);
    const { handleSubmit, control } = useForm<Filters>({
        defaultValues: {
            keywords: []
        }
    })

    const fetchKeywords = useMemo(() => debounce(async (query: string) => {
        if (query) {
            setKeywordsLoading(true);
            const options = await client.getKeywords(query);
            setKeywordsLoading(false);
            setKeywordsOptions(options);
        } else {
            setKeywordsOptions([]);
        }
    }, 1000),
        [])

    return (
        <Paper sx={{ m: 2, p: 0.5 }}>
            <form onSubmit={handleSubmit(onApply)}>
                <FormControl component="fieldset" variant="standard" sx={{ m: 2, display: "block" }}>
                    <Controller name="keywords" control={control}
                        render={({ field: { onChange, value } }) => (
                            <Autocomplete multiple={true} disablePortal
                                loading={keywordsLoading}
                                options={keywordsOptions}
                                filterOptions={x => x}
                                getOptionLabel={(option) => option.name}
                                onChange={(e, value) => onChange(value)}
                                value={value} 
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={params => <TextField {...params} label="Keywords" />}
                                onInputChange={(e, value) => fetchKeywords(value)} />
                        )} />

                </FormControl>
                <Button type="submit" variant="contained" startIcon={<FilterOutlined />} sx={{ m: 2 }}>
                    Apply filter
                </Button>
            </form>
        </Paper >
    );
}

export default MoviesFilter;