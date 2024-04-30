import { Link } from "react-router-dom";

interface CardProps {
  id: number;
  externalId: string;
  title: string;
  magnitude: number;
  magType: string;
  place: string;
  time: string;
  tsunami: boolean;
  longitude: number;
  latitude: number;
  externalUrl: string;
}

const Card = ({ title, magType, place, time, tsunami, id, externalId,
                longitude, latitude, magnitude, externalUrl } : CardProps) => {

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a target="_blank" href={externalUrl}>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">MagType:</span> {magType}
      </p>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Magnitude:</span> {magnitude}
      </p>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Place:</span> {place}
      </p>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Time:</span> {new Date(+time).toLocaleString()}
      </p>

      <div className="flex justify-between">
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Longitud:</span> {longitude}
        </p>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <span className="font-bold">Latitud:</span> {latitude}
        </p>
      </div>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">Tsunami:</span> {tsunami}
      </p>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        <span className="font-bold">External id:</span> {externalId}
      </p>

      <Link
        to={`/feature/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
        <svg
          className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Card;
