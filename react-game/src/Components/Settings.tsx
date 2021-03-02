import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            display: 'block',
            marginTop: theme.spacing(2),
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
    }),
);

export default function Settings({ count, onChange }:
    { count: number, onChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void }) {
    const classes = useStyles();
    return (
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="cards-pairs">Pairs of cards</InputLabel>
            <Select
                native
                value={count}
                onChange={onChange}
                inputProps={{
                    name: 'cardPairs',
                    id: 'cards-pairs',
                }}
            >
                <option value={8}>8 pairs</option>
                <option value={12}>12 pairs</option>
                <option value={16}>16 pairs</option>
            </Select>
        </FormControl>
    )
}