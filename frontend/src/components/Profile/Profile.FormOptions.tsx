import { validDays, validMonths } from "@/constants/birthDate";
import { validCountries } from "@/constants/country";
import { countryCodes } from "@/constants/countryCodes";

export function CountryCodes() {
  return (
    <>
      <option value="">Country Codes</option>
      {countryCodes.map((countryCode, i) => (
        <option key={`${i}-${countryCode.code}`} value={countryCode.code}>
          {countryCode.flag} {countryCode.name} {countryCode.code}
        </option>
      ))}
    </>
  );
}

export function CountryResidence() {
  return (
    <>
      <option value="" disabled>
        Select your country
      </option>
      ;
      {validCountries.map((country: string) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </>
  );
}

export function BirthDays() {
  return (
    <>
      <option value="" disabled>
        DD
      </option>
      {validDays.map((day) => (
        <option key={`days-${day.value}`} label={day.label} value={day.value}>
          {day.label}
        </option>
      ))}
    </>
  );
}

export function BirthMonths() {
  return (
    <>
      <option value="" disabled>
        Month
      </option>
      {validMonths.map((month) => (
        <option
          key={`months-${month.value}`}
          label={month.label}
          value={month.value}
        >
          {month.label}
        </option>
      ))}
    </>
  );
}
