# analysis_utils.py
import pandas as pd
from scipy.stats import pearsonr, linregress

def analyze_track_data(tracks):
    df = pd.DataFrame(tracks)

    # Convert ms to minutes
    df['duration_min'] = df['duration_ms'] / 60000

    # Example: correlation between duration and popularity
    correlation, p_value = pearsonr(df['duration_min'], df['popularity'])

    # Regression
    slope, intercept, r_value, p_val, std_err = linregress(df['duration_min'], df['popularity'])

    return {
        "correlation": correlation,
        "p_value": p_value,
        "regression": {
            "slope": slope,
            "intercept": intercept,
            "r_squared": r_value**2
        }
    }
