import React from 'react';

const REM_UNIT = 16;

export const SearchIcon = React.memo(
  ({ width = 0.875, height = 0.875, color = '#666' }) => {
    const defaultWidth = 24;
    const defaultHeight = 24;

    return (
      <svg
        width={`${width}rem`}
        height={`${height}rem`}
        viewBox={`0 0 ${width * REM_UNIT} ${height * REM_UNIT}`}
        version="1.1"
      >
        <title>Icon/common/search</title>
        <g
          id="Icon/common/search"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          transform={`scale(${(width * REM_UNIT) / defaultWidth},
          ${(height * REM_UNIT) / defaultHeight})`}
        >
          <path
            d="M10.6826,1 C16.0216,1 20.3646,5.375 20.3646,10.752 C20.3646,13.042 19.5726,15.145 18.2556,16.81 L18.2556,16.81 L22.1736,20.76 L22.7096,21.301 C23.0986,21.693 23.0966,22.326 22.7036,22.715 C22.5086,22.908 22.2546,23.005 21.9996,23.005 C21.7436,23.005 21.4856,22.906 21.2896,22.709 L21.2896,22.709 L17.8786,19.271 C17.8786,19.27 17.8776,19.269 17.8776,19.269 L17.8776,19.269 L16.8666,18.249 C15.1876,19.656 13.0326,20.504 10.6826,20.504 C5.3436,20.504 0.9996,16.129 0.9996,10.752 C0.9996,5.375 5.3436,1 10.6826,1 Z M10.6826,3 C6.4466,3 2.9996,6.478 2.9996,10.752 C2.9996,15.027 6.4466,18.504 10.6826,18.504 C14.9176,18.504 18.3646,15.027 18.3646,10.752 C18.3646,6.478 14.9176,3 10.6826,3 Z M10.284,4.5271 C10.837,4.5271 11.284,4.9751 11.284,5.5271 C11.284,6.0791 10.837,6.5271 10.284,6.5271 C8.197,6.5271 6.499,8.2421 6.499,10.3511 C6.499,10.9031 6.052,11.3511 5.499,11.3511 C4.946,11.3511 4.499,10.9031 4.499,10.3511 C4.499,7.1401 7.094,4.5271 10.284,4.5271 Z"
            id="Combined-Shape"
            fill={color}
          />
        </g>
      </svg>
    );
  },
);

export const CloseIcon = React.memo(
  ({ width = 1, height = 1, color = '#666' }) => {
    const defaultWidth = 24;
    const defaultHeight = 24;

    return (
      <svg
        width={`${width}rem`}
        height={`${height}rem`}
        viewBox={`0 0 ${width * REM_UNIT} ${height * REM_UNIT}`}
        version="1.1"
      >
        <title>Icon/common/close</title>
        <g
          id="Icon/common/close"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          transform={`scale(${(width * REM_UNIT) / defaultWidth},
          ${(height * REM_UNIT) / defaultHeight})`}
        >
          <path
            d="M4.293,19.707 C4.488,19.902 4.744,20 5,20 C5.256,20 5.512,19.902 5.707,19.707 L12,13.414 L18.293,19.707 C18.488,19.902 18.744,20 19,20 C19.256,20 19.512,19.902 19.707,19.707 C20.098,19.316 20.098,18.684 19.707,18.293 L13.414,12 L19.707,5.707 C20.098,5.316 20.098,4.684 19.707,4.293 C19.316,3.902 18.684,3.902 18.293,4.293 L12,10.586 L5.707,4.293 C5.316,3.902 4.684,3.902 4.293,4.293 C3.902,4.684 3.902,5.316 4.293,5.707 L10.586,12 L4.293,18.293 C3.902,18.684 3.902,19.316 4.293,19.707"
            id="Fill-1"
            fill={color}
          />
        </g>
      </svg>
    );
  },
);
