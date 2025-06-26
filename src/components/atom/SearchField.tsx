interface Props {
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (value: string) => void;
  onSearch?: () => void;
  className?: string;
}

export function SearchField({
  value,
  placeholder = 'Buscar...',
  onChange,
  onInput,
  onSearch,
  className = '',
}: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center overflow-hidden rounded-full border border-gray-200 bg-white shadow-md transition-shadow duration-300 focus-within:border-transparent focus-within:ring-2 focus-within:ring-blue-500 hover:shadow-lg">
        {/* Icono de búsqueda */}
        <div className="pl-4 pr-2 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Campo de entrada */}
        <input
          type="text"
          className="w-full px-2 py-3 text-gray-700 placeholder-gray-400 outline-none"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onInput={onInput ? (e) => onInput(e.currentTarget.value) : undefined}
          onKeyDown={handleKeyDown}
        />

        {/* Botón de búsqueda */}
        {onSearch && (
          <button
            onClick={onSearch}
            className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 font-medium text-white transition-all duration-300 hover:from-blue-600 hover:to-blue-700 active:scale-95"
          >
            Buscar
          </button>
        )}
      </div>
    </div>
  );
}
