function BackgroundEffects() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 left-[10%] w-[480px] h-[480px] bg-amber-700/25 rounded-full blur-3xl" />

      <div className="absolute -bottom-40 right-[8%] w-[480px] h-[480px] bg-orange-800/30 rounded-full blur-3xl" />

      <div className="absolute top-[30%] left-1/2 w-[420px] h-[420px] bg-amber-600/10 rounded-full blur-3xl -translate-x-1/2" />
    </div>
  );
}

export default BackgroundEffects;