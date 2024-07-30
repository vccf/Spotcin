import { Router, Request, Response } from 'express'; // Assuming you're using Express for your application
import { InternalServerError, NotFoundError } from '../utils/errors/http.error'; // Custom error handling if applicable
import { Result, SuccessResult } from '../utils/result';
import RecommendationService from '../services/recommendation.service';
import RecommendationEntity from '../entities/recommendation.entity'

class RecommendationController {
    private prefix: string = '/recommendations';
    public router: Router;
    private recommendationService: RecommendationService;
  
    constructor(router: Router, recommendationService: RecommendationService) {
      this.router = router;
      this.recommendationService = recommendationService;
      this.initRoutes();
    }

    private initRoutes() {

        // Route to generate recommendations
        /*
        this.router.post('/recommendations/playlist', async (req: Request, res: Response) => {
            const { userId, userHistory } = req.body;
            const playlist = await this.generateRecommendations(userId, userHistory);
            //const playlist = this.recommendationService.generateRecommendations(userId, userHistory);
            //res.status(201).json(playlist);
        });
        // Route to get more recommendations
        this.router.post('/recommendations/playlist/more', async (req: Request, res: Response) => {
            const { userId, userHistory } = req.body;
            const playlist = await this.getMoreRecommendations(userId, userHistory);
            //const playlist = this.recommendationService.getMoreRecommendations(userId, userHistory);
            //res.status(200).json(playlist);
        });
        // Route to get recommendation history
        this.router.get('/recommendations/history', async (req: Request, res: Response) => {
            const { userId, userHistory } = req.body;
            const playlist = await this.getRecommendationHistory(userId, userHistory); //Ver se está certo
            //const userId = req.params.userId;
            //const playlist = this.recommendationService.getRecommendationHistory(userId);
            //res.status(200).json(playlist);
        });

        // Route to delete a recommended song
        this.router.delete('/recommendations/playlist/:songIndex', async (req: Request, res: Response) => {
            //const userId = req.params.userId;
            const { userId, songIndex } = req.body;
            //const songIndex = parseInt(req.params.songIndex, 10); // Convert string to number
            const result = await this.deleteRecommendedSong(userId, songIndex);
            /*const result = this.recommendationService.deleteRecommendedSong(userId, songIndex);
            if (typeof result === 'string') {
                res.status(400).json({ error: result });
            } else {
                res.status(200).json(result);
            }*/
        /*});
        // Route to check user listening history for recommendations
        this.router.post('/recommendations/check', async (req: Request, res: Response) => {
            const { userId, userHistory } = req.body;
            const errorMessage = await this.checkUserListeningHistory(userId, userHistory);
            /*const errorMessage = this.recommendationService.checkUserListeningHistory(userId, userHistory);
            if (errorMessage) {
                res.status(400).json({ error: errorMessage });
            } else {
                res.status(200).json({ message: 'User listened enough songs for recommendations' });
            }*/
        /*});*/
        // Route to generate recommendations
        this.router.post('/recommendations/playlist', async (req: Request, res: Response) => {
            //const { userId, userHistory } = req.body;
            //const playlist = await this.getRecs(userId, userHistory);
            //console.log(req.body)
            //console.log(userId)
            //console.log(userHistory)
            const playlist = await this.getRecs (req, res);
        });
        // Route to get more recommendations
        this.router.post('/recommendations/playlist/more', async (req: Request, res: Response) => {
            //const { userId, userHistory } = req.body;
            //const playlist = await this.getMoreRecs(userId, userHistory);
            const playlist = await this.getMoreRecs(req, res);
        });
        // Route to get recommendation history
        this.router.get('/recommendations/history', async (req: Request, res: Response) => {
            //const { userId, userHistory } = req.body;
            //const playlist = await this.getHistRec(userId, userHistory); //Ver se está certo
            const playlist = await this.getHistRec(req, res);
        });

        // Route to delete a recommended song
        this.router.delete('/recommendations/playlist/:songIndex', async (req: Request, res: Response) => {
            //const { userId, songIndex } = req.body;
            //const result = await this.deleteOneRec(userId, songIndex);
            const result = await this.deleteOneRec(req, res);
        });
        // Route to check user listening history for recommendations
        this.router.post('/recommendations/check', async (req: Request, res: Response) => {
            //const { userId, userHistory } = req.body;
            //const errorMessage = await this.checkUserHistory(userId, userHistory);
            const errorMessage=await this.checkUserHistory(req, res);
        });
    }

    public async checkUserHistory(req: Request, res: Response) {
        await this.recommendationService.checkUserHistory();
        return new SuccessResult({
            msg: 'User history checked successfully',
        }).handle(res);
    }

    public async getRecs(req: Request, res: Response){
        await this.recommendationService.getRecs();
        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
        }).handle(res);
    }

    public async getMoreRecs(req: Request, res: Response){
        await this.recommendationService.getMoreRecs();
        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
        }).handle(res);
    }

    public async getHistRec (req: Request, res: Response) {
        await this.recommendationService.getHistRec();
        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
        }).handle(res);
    }

    public async deleteOneRec (req: Request, res: Response){
        const { song } = req.body;
        await this.recommendationService.deleteOneRec(song);
        return new SuccessResult({
            msg: Result.transformRequestOnMsg(req),
        }).handle(res);
    }



    public generateRecommendations = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        const { userHistory } = req.body; // Assuming the body contains userHistory array
        try {
            const recommendations = await this.recommendationService.generateRecommendations(userId, userHistory);
            res.status(201).json(recommendations);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public getMoreRecommendations = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        const { userHistory } = req.body; // Assuming the body contains userHistory array
        try {
            const recommendations = await this.recommendationService.getMoreRecommendations(userId, userHistory);
            res.json(recommendations);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public getRecommendationHistory = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        try {
            const recommendationHistory = await this.recommendationService.getRecommendationHistory(userId);
            res.json(recommendationHistory);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public deleteRecommendedSong = async (req: Request, res: Response): Promise<void> => {
        const { userId, songIndex } = req.params;
        try {
            await this.recommendationService.deleteRecommendedSong(userId, +songIndex); // Convert songIndex to number
            res.status(204).send();
            console.log('Song deleted successfully');
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    //public checkUserListeningHistory = async (req: Request, res: Response): Promise<void> => {
    public checkUserListeningHistory = async (req: Request, res: Response) =>{
        const { userId } = req.params;
        const { userHistory } = req.body; // Assuming the body contains userHistory array
        //try {
            //const errorMessage = await this.recommendationService.checkUserListeningHistory(userId, userHistory);
            await this.recommendationService.checkUserListeningHistory(userId, userHistory);
            return new SuccessResult({
                msg: Result.transformRequestOnMsg(req),
            }).handle(res);

            /*if (errorMessage) {
                res.status(400).json({ error: errorMessage });
            } else {
                res.status(200).json({ message: 'User listened enough songs for recommendations' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }*/
    };
}

export default RecommendationController;
