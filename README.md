# stock-information
A module to acquire stock information from [Quandl API](https://www.quandl.com/tools/api)

### Usage

```
export API_KEY=ApIKeY && export SLACK_PATH=T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX && node index.js AAPL Jan 1 2018 - Jan 5 2018

```

### Environment Variables

- `API_KEY` - **required** - key to access Quandl API
- `SLACK_PATH` - path for slack integration e.g. `T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`

### Params

- `Stock symbol` -  **required** - a stock symbold e.g. `AAPL`, `GOOG` etc.
- `Start date` - **required** - start date to see on the report. e.g. `Jan 1 2019`
- `End date` - end date for the report default is today.

### Example output

```text
Stock report for Alphabet Inc (GOOG) Prices, Dividends, Splits and Trading Volume from 02.01.18 - 05.01.18

02.01.18: Closed at 1065 (1045.23 ~ 1066.94)
03.01.18: Closed at 1082.48 (1063.21 ~ 1086.29)
04.01.18: Closed at 1086.4 (1084 ~ 1093.57)
05.01.18: Closed at 1102.23 (1092 ~ 1104.25)

First 3 Drawdowns:

-2.1% (1086.29 on 03.01.18 -> 1063.21 on 03.01.18)
-2.0% (1066.94 on 02.01.18 -> 1045.23 on 02.01.18)
-1.1% (1104.25 on 05.01.18 -> 1092 on 05.01.18)

Maximum drawdown: -2.1% (1086.29 on 03.01.18 -> 1063.21 on 03.01.18)
Return: 37.23000000000002 [+3.5%] (1065 on 02.01.18 -> 1102.23 on 05.01.18)
```

### Related Links:

- [Quandl API](https://www.quandl.com/tools/api)
