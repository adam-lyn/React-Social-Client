import GoodResult from './GoodResult';
import BadResult from './BadResult';

export default function ResultsList({ results, handleClick }:any) {
  if (results.length) {
    return (
      <div className='results-list'>
        {
          results.map((result: any) => <GoodResult handleClick={handleClick} user={result} />)
        }
      </div>
    );
  }
  return (
    <div className='results-list'>
      <BadResult />
    </div>
  );
}
