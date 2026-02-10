import { useEffect, useState, useCallback } from "react";

function useCurrencyInfo(currency) {
    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [exchangeRates, setExchangeRates] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const currencyCode = currency.toUpperCase();
        
        fetch(`https://open.er-api.com/v6/latest/${currencyCode}`)
            .then((res) => res.json())
            .then((data) => {
                if (isMounted && data.rates) {
                    setCurrencyOptions(Object.keys(data.rates));
                    setExchangeRates(data.rates);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    console.error("Error fetching currency data:", err);
                    setError(err.message);
                    setLoading(false);
                }
            });
            
        return () => { isMounted = false; };
    }, [currency]);

    const convert = useCallback((amount, toCurrency) => {
        const key = toCurrency.toUpperCase();
        if (!exchangeRates[key]) return 0;
        return (amount * exchangeRates[key]).toFixed(2);
    }, [exchangeRates]);

    return { currencyOptions, exchangeRates, convert, loading, error };
}

export default useCurrencyInfo;