"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2025-12-30T00:00:00");

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
  const currentTime = new Date();
  const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0);

  const isExpired = timeDifference === 0;
  return {
    days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
    hours: Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    ),
    minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
    isExpired,
  };
};

const DealCountdown = () => {
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    setTime(calculateTimeRemaining(TARGET_DATE));

    const timerInterval = setInterval(() => {
      const newTime = calculateTimeRemaining(TARGET_DATE);
      setTime(newTime);

      if (newTime.isExpired) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  // Show skeleton loader during SSR/hydration
  if (!time) {
    return <CountdownSkeleton />;
  }

  if (time.isExpired) {
    return <ExpiredDeal />;
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20 items-center">
      <div className="flex flex-col gap-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold mb-3">
            Deal Of The Month
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            Get ready for a shopping experience like never before with our Deals
            of the Month! Every purchase comes with exclusive perks and offers,
            making this month a celebration of savvy choices and amazing deals.
            Don&apos;t miss out! 🎁🛒
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </div>

        <div>
          <Button asChild size="lg" className="w-full md:w-auto">
            <Link href="/search">View Products</Link>
          </Button>
        </div>
      </div>

      <div className="flex justify-center md:justify-end">
        <div className="relative w-full max-w-md aspect-3/2">
          <Image
            src="/images/promo.jpg"
            alt="Monthly deal promotion"
            fill
            className="object-contain rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
    </section>
  );
};

const StatBox = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center justify-center p-4 bg-muted rounded-lg">
    <p
      className="text-3xl md:text-4xl font-bold tabular-nums"
      suppressHydrationWarning
    >
      {value.toString().padStart(2, "0")}
    </p>
    <p className="text-xs md:text-sm text-muted-foreground mt-1">{label}</p>
  </div>
);

const CountdownSkeleton = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20 items-center">
    <div className="flex flex-col gap-6">
      <div>
        <div className="h-10 bg-muted rounded-md w-3/4 mb-3 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded w-full animate-pulse" />
          <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
          <div className="h-4 bg-muted rounded w-4/6 animate-pulse" />
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
    <div className="flex justify-center md:justify-end">
      <div className="w-full max-w-md aspect-3/2 bg-muted rounded-lg animate-pulse" />
    </div>
  </section>
);

const ExpiredDeal = () => (
  <section className="grid grid-cols-1 md:grid-cols-2 gap-8 my-20 items-center">
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-3xl md:text-4xl font-bold mb-3">Deal Has Ended</h3>
        <p className="text-muted-foreground leading-relaxed">
          This deal is no longer available. Check out our latest promotions and
          discover more amazing offers!
        </p>
      </div>
      <div>
        <Button asChild size="lg" className="w-full md:w-auto">
          <Link href="/search">View Products</Link>
        </Button>
      </div>
    </div>
    <div className="flex justify-center md:justify-end">
      <div className="relative w-full max-w-md aspect-3/2">
        <Image
          src="/images/promo.jpg"
          alt="Promotion"
          fill
          className="object-contain rounded-lg opacity-60"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  </section>
);

export default DealCountdown;
