import { ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supportedcoins } from "@/lib/constants";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
export default function To({
  toChevron,
  setToChevron,
  toAmount,
  setToAmount,
  toToken,
  setToToken,
}: {
  toChevron: boolean;
  setToChevron: (toChevron: boolean) => void;
  toAmount: string;
  setToAmount: (toAmount: string) => void;
  toToken: string;
  setToToken: (toToken: string) => void;
}) {
  return (
    <Card className="w-full border-white bg-zinc-950">
      <CardTitle>
        <p className="text-xs text-muted-foreground font-semibold p-2">
          You receive
        </p>
      </CardTitle>
      <CardContent className="flex justify-between p-0">
        <Menubar
          onClick={() => {
            setToChevron(!toChevron);
          }}
          className="border-none"
        >
          <MenubarMenu>
            <MenubarTrigger
              onClick={() => {
                setToChevron(!toChevron);
              }}
            >
              <div className="flex space-x-2 items-center ">
                <Image
                  src={`/coins/${toToken}.png`}
                  width={20}
                  height={20}
                  alt=""
                  className="rounded-full"
                />
                <p>{supportedcoins[toToken].symbol}</p>
                {!toChevron ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </div>
            </MenubarTrigger>
            <MenubarContent>
              {Object.values(supportedcoins).map((coin) => (
                <MenubarItem
                  onClick={() => {
                    setToToken(coin.symbol.toLowerCase());
                    setToChevron(true);
                  }}
                >
                  <div className="flex space-x-2">
                    <Image
                      src={`/coins/${coin.symbol.toLowerCase()}.png`}
                      width={20}
                      height={20}
                      alt=""
                      className="rounded-full"
                    />
                    <p>{coin.symbol}</p>
                  </div>
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <Input
          className="font-semibold border-none w-[50%] text-right hover:border-none"
          disabled
          value={toAmount}
          onChange={(e) => {
            const decimalRegex = /^\d+(\.\d*)?$/;
            if (decimalRegex.test(e.target.value)) setToAmount(e.target.value);
          }}
        />
      </CardContent>
      <CardFooter className="px-2 pb-2">
        <p className="text-xs text-muted-foreground">
          {supportedcoins[toToken].name}
        </p>
      </CardFooter>
    </Card>
  );
}
