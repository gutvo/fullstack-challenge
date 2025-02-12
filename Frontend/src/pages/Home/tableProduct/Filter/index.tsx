import { Box, Button, TextField } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { Dispatch, SetStateAction, useState } from 'react';
import { useIntl } from '../../../../translate/useTranslate';

interface TableProductFilterProps {
    setFilter: Dispatch<SetStateAction<{ name: string; price: string }>>;
    pagination: {
        filter: {
            name: string;
            price: string;
        };
    };
}

export function TableFilter({
    setFilter,
    pagination,
}: TableProductFilterProps) {
    const { formatMessage } = useIntl();

    const [name, setName] = useState(pagination.filter.name);
    const [price, setPrice] = useState(pagination.filter.price);

    function handleSeachProduct() {
        const formatedPrice = price.replace(',', '.');
        setFilter({ name, price: formatedPrice });
    }

    function handleFormClean() {
        setName('');
        setPrice('');
        setFilter({ name: '', price: '' });
    }

    return (
        <Box
            marginBottom={2}
            sx={{
                display: 'flex',
                height: '3rem',
                gap: '1%',
            }}
        >
            <TextField
                sx={{
                    width: '50%',
                    marginBottom: 0,
                }}
                inputProps={{
                    style: {
                        height: '3rem',
                        padding: 0,
                        paddingLeft: '0.5rem',
                    },
                }}
                InputLabelProps={{
                    style: {
                        lineHeight: '1rem',
                    },
                }}
                label={formatMessage({
                    id: 'filterProductNameLabel',
                })}
                value={name}
                onChange={(envent) => {
                    setName(envent.target.value);
                }}
                placeholder={formatMessage({
                    id: 'filterProductNamePlaceholder',
                })}
            />
            <TextField
                type="number"
                sx={{
                    width: '30%',
                    marginBottom: 0,
                }}
                inputProps={{
                    style: {
                        height: '3rem',
                        padding: 0,
                        paddingLeft: '0.5rem',
                    },
                }}
                InputLabelProps={{
                    style: {
                        lineHeight: '1rem',
                    },
                }}
                label={formatMessage({
                    id: 'filterProductPriceLabel',
                })}
                value={price}
                onChange={(event) => {
                    const inputValue = event.target.value;
                    if (/^\d*\.?\d*$/.test(inputValue)) {
                        setPrice(inputValue);
                    }
                }}
                placeholder={formatMessage({
                    id: 'filterProductPricePlaceholder',
                })}
            />
            <Button
                variant="contained"
                sx={{ width: '5%' }}
                color="error"
                onClick={handleFormClean}
            >
                <CleaningServicesIcon />
            </Button>
            <Button
                variant="contained"
                sx={{ width: '30%' }}
                color="success"
                onClick={handleSeachProduct}
            >
                {formatMessage({
                    id: 'filterProductButton',
                })}
            </Button>
        </Box>
    );
}
