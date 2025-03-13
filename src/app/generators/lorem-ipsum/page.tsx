"use client"
import Accordion from "@/components/accordion";
import DropDown from "@/components/drop-down";
import InputField from "@/components/input-field";
import Textarea from "@/components/textarea";
import { LoremIpsum } from 'lorem-ipsum';
import { useCallback, useEffect, useState } from "react";

const dataCorpus = ["Lorem Ipsum (Marcus Tulius Cicero), Latin"];
const dataType = ["Words", "Sentences", "Paragraphs"];

export default function PasswordPage() {
    const [inputLength, setInputLength] = useState(1);
    const [selectCorpus, setSelectCorpus] = useState("Lorem Ipsum (Marcus Tulius Cicero), Latin");
    const [selectType, setSelectType] = useState("Words");
    const [output, setOutput] = useState("");

    const generateLorem = useCallback(() => {
        const lorem = new LoremIpsum();
        if (inputLength > 0) {
            if (selectType === "Words") {
                setOutput(lorem.generateWords(inputLength));
            } else if (selectType === "Sentences") {
                setOutput(lorem.generateSentences(inputLength));
            } else {
                setOutput(lorem.generateParagraphs(inputLength));
            }
        }else{
            setOutput("Length phải lớn hơn 0")
        }
    }, [selectType, inputLength]);

    useEffect(() => {
        generateLorem();
    }, [inputLength, selectType])

    return (
        <div className="h-full w-full overflow-y-hidden">
            <p className="text-2xl mb-2">Lorem Ipsum Generator</p>
            <div className="h-full">
                <Accordion
                    label="Configuration"
                    title="Text corpus"
                    iconRight={<DropDown data={dataCorpus} selectItemDropDown={selectCorpus}/>}
                        />

                <Accordion
                    title="Type"
                    content="Generate words, sentences or paragraphs of Lorem Ipsum"
                    iconRight={<DropDown
                        data={dataType}
                        selectItemDropDown={selectType}
                        onSelectItemDropDown={setSelectType} />} />

                <Accordion
                    title="Length"
                    content="Number of words, sentences of paragraphs to generate"
                    iconRight={<InputField
                        type="number"
                        value={inputLength}
                        onChange={(text) => setInputLength(Number(text.target.value))}
                        style={{ width: 100 }} />} />

                <div className="w-full h-full mt-4">
                    <Textarea
                        label="Output"
                        value={output} />
                </div>
            </div>
        </div>
    )
}