import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Index() {
  const [tariff, setTariff] = useState<'basic' | 'premium'>('basic');
  const [amount, setAmount] = useState(9000);
  const [days, setDays] = useState(30);
  const [timeLeft, setTimeLeft] = useState('17:49');

  const maxAmount = tariff === 'basic' ? 30000 : 49000;
  const minAmount = 3000;
  const maxDays = 98;
  const minDays = 7;

  const interestRate = 0.01;
  const returnAmount = amount + (amount * interestRate * days);
  const earlyReturnAmount = amount;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const target = new Date();
      target.setHours(17, 49, 0, 0);
      
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      
      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateDeadline = () => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 1);
    const day = deadline.getDate();
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const month = months[deadline.getMonth()];
    return `${day} ${month}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0EA5E9] via-[#3B82F6] to-[#1E40AF] flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-md bg-white rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl p-4 sm:p-8 animate-fade-in">
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8">
          <button
            onClick={() => setTariff('basic')}
            className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-6 rounded-xl sm:rounded-2xl font-heading font-semibold text-base sm:text-lg transition-all duration-300 ${
              tariff === 'basic'
                ? 'bg-[#0EA5E9] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            До 30 000 ₽
          </button>
          <button
            onClick={() => setTariff('premium')}
            className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-6 rounded-xl sm:rounded-2xl font-heading font-semibold text-base sm:text-lg transition-all duration-300 ${
              tariff === 'premium'
                ? 'bg-[#0EA5E9] text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            До 49 000 ₽
          </button>
        </div>

        <div className="space-y-6 sm:space-y-8 animate-scale-in">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-gray-600 text-base sm:text-lg font-medium">Сумма</span>
              <span className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">
                {amount.toLocaleString('ru-RU')} ₽
              </span>
            </div>
            <Slider
              value={[amount]}
              onValueChange={(value) => setAmount(value[0])}
              min={minAmount}
              max={maxAmount}
              step={1000}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{minAmount.toLocaleString('ru-RU')} ₽</span>
              <span>{(maxAmount / 2).toLocaleString('ru-RU')} ₽</span>
              <span>{maxAmount.toLocaleString('ru-RU')} ₽</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl sm:rounded-3xl p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3 sm:mb-4">
              <span className="text-gray-600 text-base sm:text-lg font-medium">Срок</span>
              <span className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">
                {days} {days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}
              </span>
            </div>
            <Slider
              value={[days]}
              onValueChange={(value) => setDays(value[0])}
              min={minDays}
              max={maxDays}
              step={1}
              className="mb-2"
            />
            <div className="flex justify-between text-xs sm:text-sm text-gray-500">
              <span>{minDays} дней</span>
              <span>{Math.floor(maxDays / 2)} дней</span>
              <span>{maxDays} дней</span>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600 text-sm sm:text-base">При возврате до {calculateDeadline()}:</span>
              <span className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
                {earlyReturnAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-gray-600 text-sm sm:text-base">При возврате в срок:</span>
              <span className="text-lg sm:text-2xl font-bold text-gray-900 whitespace-nowrap">
                {returnAmount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₽
              </span>
            </div>
          </div>

          <Button 
            className="w-full h-14 sm:h-16 text-lg sm:text-xl font-heading font-bold rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] hover:from-[#0284C7] hover:to-[#2563EB] shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse-soft active:scale-95"
          >
            Получить деньги
          </Button>

          <div className="text-center">
            <p className="text-gray-600 text-base sm:text-lg">
              Деньги у вас уже в <span className="font-heading font-bold text-[#0EA5E9] text-xl sm:text-2xl">{timeLeft}</span>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}