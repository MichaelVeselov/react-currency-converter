const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

const Block = (props) => {
  const { value, activeCurrency, onChangeValue, onChangeCurrency } = props;

  return (
    <div className='block'>
      <ul className='currencies'>
        {defaultCurrencies.map((item) => (
          <li onClick={() => onChangeCurrency(item)} className={item === activeCurrency ? 'active' : ''} key={item}>
            {item}
          </li>
        ))}
        <li>
          <svg height='50px' viewBox='0 0 50 50' width='50px'>
            <rect fill='none' height='50' width='50' />
            <polygon points='47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 ' />
          </svg>
        </li>
      </ul>
      <input onChange={(event) => onChangeValue(event.target.value)} value={value} type='text' placeholder={0} />
    </div>
  );
};

export default Block;
