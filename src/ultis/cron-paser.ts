import cronParser from 'cron-parser';

export default function parseCronExpression(cronExpression: string) {
    try {
        const interval = cronParser.parse(cronExpression);
        const nextRuns = [];
        for (let i = 0; i < 5; i++) {
            nextRuns.push(interval.next().toString());
        }
        return { success: true, nextRuns };
    } catch (error) {
        return { success: false, error: 'Invalid Cron Expression' };
    }
}