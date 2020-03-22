import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import * as constants from '../Common/constant'

function WeatherUnitSelector({selTempFormat}) {

    const [value, setValue] = useState(constants.FAHRENHEIT)

    return (
        <FormControl component="fieldset" className="unit-selector">
            <RadioGroup aria-label="position" row name="position" value={value} onChange={(event) => {
                    setValue(event.target.value);
                    selTempFormat(event.target.value);
                }} >
                <FormControlLabel
                    value= {constants.CELCIUS}
                    control= {<Radio color="primary" />}
                    label= {constants.CELCIUS}
                    labelPlacement= "end"
                />
                
                <FormControlLabel
                    value= {constants.FAHRENHEIT}
                    control= {<Radio color="primary" />}
                    label= {constants.FAHRENHEIT}
                    labelPlacement= "end"
                />
            </RadioGroup>
        </FormControl>
    )
}

export default React.memo(WeatherUnitSelector);