import {allFakers, faker} from '@faker-js/faker';
import {getRandomItem} from '../../utils';
import {countries, support_iban} from '../../constants/Options';

const usePerson = (_locale, _gender, _age, _quantity = 1) => {
  if (_quantity > 10000) {
    return console.log('Quantity should be less than 10000');
  }

  let _seed = Math.floor(Math.random() * 1e7);

  let data = {
    locale: _locale,
    seed: _seed,
    total: _quantity,
    data: [],
  };

  _gender = _gender === 'random' ? getRandomItem(['male', 'female']) : _gender;

  const countryCode = `${
    countries.find(c => c.value === _locale).icon
  }`.toUpperCase();
  const isSupportIban = support_iban.includes(countryCode);

  const f = allFakers[_locale];

  for (let i = 0; i < _quantity; i++) {
    const firstName = f.person.firstName(_gender);
    const lastName = f.person.lastName();
    const year = new Date().getFullYear();
    const month = Math.floor(Math.random() * 12) + 1;
    const birthdate = f.date.birthdate({
      mode: 'age',
      min: _age.minAge,
      max: _age.maxAge,
    });

    // Extract year, month, and date
    const bYear = birthdate.getFullYear();
    const bMonth = String(birthdate.getMonth() + 1).padStart(2, '0');
    const bDate = String(birthdate.getDate()).padStart(2, '0');
    const age = year - bYear;
    const cardIssuer = f.finance.creditCardIssuer();
    const city = f.location.city();
    const state = f.location.state();
    const zipCode = f.location.zipCode();
    const myseed = Math.floor(Math.random() * 1e7);
    const obj = {
      id: 1,
      seed: myseed,
      avatar: f.image.urlLoremFlickr({
        height: 256,
        width: 256,
        category: _gender === 'male' ? 'boy' : 'girl',
      }),
      flag: countryCode,
      card: [
        {key: 'Credit Card Name', value: cardIssuer},
        {
          key: 'Card Number',
          value: f.finance.creditCardNumber({issuer: cardIssuer}),
        },
        {key: 'Expires', value: `${month}/${year + 4}`},
        {key: 'CVV', value: f.finance.creditCardCVV()},
        {key: 'SWIFT/BIC', value: f.finance.bic({includeBranchCode: true})},
        {
          key: 'Bitcoin Address',
          value: f.finance.bitcoinAddress({type: 'bech32'}),
        },
        {key: 'Ethereum Address', value: f.finance.ethereumAddress()},
        {key: 'Litecoin Address', value: f.finance.litecoinAddress()},
        {key: 'Routing Number', value: f.finance.routingNumber()},
        {
          key: 'IBAN',
          value: f.finance.iban({
            formatted: true,
            countryCode: isSupportIban ? countryCode : 'GB',
          }),
        },
      ],
      internet: [
        {key: 'Username', value: f.internet.userName({firstName, lastName})},
        {key: 'Password', value: f.internet.password()},
        {key: 'Email', value: f.internet.email({firstName, lastName})},
        {key: 'Website', value: `http://${f.internet.domainName()}`},
        {key: 'UUID', value: f.string.uuid()},
        {key: 'User Agent', value: f.internet.userAgent()},
        {key: 'IP Address (IPv4)', value: f.internet.ipv4()},
        {key: 'IP Address (IPv6)', value: f.internet.ipv6()},
        {key: 'MAC Address', value: f.internet.mac()},
      ],
      phone: [
        {key: 'Phone', value: f.phone.number({style: 'international'})},
        {key: 'IMEI number', value: f.phone.imei()},
      ],
      personal: [
        {key: 'First Name', value: firstName},
        {key: 'Last Name', value: lastName},
        {
          key: 'Full Name',
          value: f.person.fullName({firstName, lastName, sex: _gender}),
        },
        {
          key: 'Gender',
          value: _gender.charAt(0).toUpperCase() + _gender.slice(1),
        },
        {
          key: 'Father Name',
          value: f.person.fullName({lastName, sex: 'male'}),
        },
        {
          key: 'Mother Name',
          value: f.person.fullName({lastName, sex: 'female'}),
        },
        {
          key: 'Full Address',
          value: `${f.location.streetAddress(
            true,
          )}, ${city}, ${state}, ${countryCode} ${zipCode}`,
        },
        {
          key: 'City',
          value: city,
        },
        {
          key: 'State',
          value: state,
        },
        {
          key: 'Zip Code',
          value: zipCode,
        },
        {key: 'Latitude', value: f.location.latitude()},
        {key: 'Longitude', value: f.location.longitude()},
        {
          key: 'SSN',
          value: `${f.number.int({min: 100, max: 999})}-${f.number.int({
            min: 10,
            max: 99,
          })}-${f.number.int({min: 1000, max: 9999})}`,
        },
        {key: 'Birthday', value: `${bYear}-${bMonth}-${bDate}`},
        {key: 'Age', value: `${age} years old`},
        {key: 'Zodiac', value: f.person.zodiacSign()},
      ],
      others: [
        {key: 'Company Name', value: f.company.name()},
        {key: 'Job Type', value: f.person.jobType()},
        {key: 'Job Title', value: f.person.jobTitle()},
        {key: 'Vehicle', value: f.vehicle.vehicle()},
        {key: 'Bicycle', value: f.vehicle.bicycle()},
        {key: 'Vehicle Identification Number (VIN)', value: f.vehicle.vin()},
        {key: 'Vehicle Registration Mark/Number (VRM)', value: f.vehicle.vrm()},
        {key: 'Favorite Color', value: f.color.human()},
        {key: 'Favorite Animal', value: f.animal.type()},
      ],
    };

    data?.data.push(obj);
  }

  return data;
};

export default usePerson;
