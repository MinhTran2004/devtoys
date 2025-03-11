"use client"
import Accordion from "@/components/accordion";
import { useCallback, useEffect, useState } from "react";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Toogle from "@/components/switch";
import Textarea from "@/components/textarea";
import DropDown from "@/components/drop-down";
import InputField from "@/components/input-field";
import parseCronExpression from "@/ultis/cron-paser";

const dataDropDown = ["5", "10", "25", "50", "100"];

export default function CronParserPage() {
    const [inputExpression, setInputExpression] = useState("* * * * * *");
    const [inputDescription, setInputDescription] = useState("");
    const [output, setOutput] = useState("");
    const [formatDate, setFormatDate] = useState("yyyy-MM-dd ddd HH:mm:ss");

    const [isChecked, setIsChecked] = useState(true);
    const [selectItemDropDown, setSelectItemDropDown] = useState("5");

    const handleCronPaser = useCallback(() => {
        try {
            if (inputExpression.length > 10) {
                const result = parseCronExpression(inputExpression);

                let convertArray = "";

                result.nextRuns?.map((item) => {
                    convertArray = convertArray + item + "\n"
                })

                setOutput(convertArray);
            } else {
                setOutput("");
            }
        } catch (err) {
            console.log(err);
            setOutput("Lỗi định dạng")
        }
    }, [inputExpression]);

    useEffect(() => {
        handleCronPaser();
    }, [handleCronPaser])

    return (
        <div className="h-full w-full">
            <p className="text-2xl mb-2">URL Encoders / Decoders</p>

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Include seconds"
                content="Whether the Cron expression should include seconds in its definition"
                iconRight={<Toogle textFalse="Decode" textTrue="Encode" statusSwicth={isChecked} onChangeStatus={setIsChecked} />} />

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Next sheduled dates"
                content="How many scheduled dates needs to be fenerated"
                iconRight={<DropDown data={dataDropDown} onSelectItemDropDown={setSelectItemDropDown} selectItemDropDown={selectItemDropDown} />} />

            <Accordion
                iconLeft={<CurrencyExchangeIcon />}
                title="Output format"
                content="Date time format of upcoming dates"
                iconRight={<InputField disabled type="text" value={formatDate} onChange={text => setFormatDate(text.target.value)} />} />

            <div className="flex flex-col mt-7 mb-2 gap-3">
                <InputField
                    label="Cron expression to parse"
                    value={inputExpression}
                    placeholder="* * * * * *"
                    onChange={text => setInputExpression(text.target.value)} />

                <InputField
                    disabled
                    label="Cron description"
                    value={inputDescription}
                    placeholder="Đang hoàn thiện"
                    onChange={text => setInputDescription(text.target.value)} />
            </div>

            <div className="h-1/2 mt-8">
                <Textarea
                    disabled
                    label="Next scheduled dates"
                    value={output}
                />
            </div>
        </div>
    )
}