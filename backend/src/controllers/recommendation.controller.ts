import { Router, Request, Response } from 'express'; // Assuming you're using Express for your application
import { InternalServerError, NotFoundError } from '../utils/errors/http.error'; // Custom error handling if applicable
import RecommendationService from '../services/recommendation.service';
import RecommendationEntity from '../entities/recommendation.entity'

class RecommendationController {
    private prefix: string = '/:userId/recommendations';
    public router: Router;
    private recommendationService: RecommendationService;
  
    constructor(router: Router, recommendationService: RecommendationService) {
      this.router = router;
      this.recommendationService = recommendationService;
      this.initRoutes();
    }

    private initRoutes() {

        // Route to generate recommendations
        this.router.post('/:userId/recommendations/playlist', (req: Request, res: Response) => {
            const { userId, userHistory } = req.body;
            const playlist = this.recommendationService.generateRecommendations(userId, userHistory);
            res.status(201).json(playlist);
        });
        // Route to get more recommendations
        this.router.post('/:userId/recommendations/playlist/more', (req: Request, res: Response) => {
            const { userId, userHistory } = req.body;
            const playlist = this.recommendationService.getMoreRecommendations(userId, userHistory);
            res.status(200).json(playlist);
        });
        // Route to get recommendation history
        this.router.get('/:userId/recommendations/history', (req: Request, res: Response) => {
            const userId = req.params.userId;
            const playlist = this.recommendationService.getRecommendationHistory(userId);
            res.status(200).json(playlist);
        });
        // Route to delete a recommended song
        this.router.delete('/:userId/recommendations/playlist/:songIndex', (req: Request, res: Response) => {
            const userId = req.params.userId;
            const songIndex = parseInt(req.params.songIndex, 10); // Convert string to number
            const result = this.recommendationService.deleteRecommendedSong(userId, songIndex);
            if (typeof result === 'string') {
                res.status(400).json({ error: result });
            } else {
                res.status(200).json(result);
            }
        });
        // Route to check user listening history for recommendations
        this.router.post('/:userId/recommendations/check', (req: Request, res: Response) => {
            const { userId, userHistory } = req.body;
            const errorMessage = this.recommendationService.checkUserListeningHistory(userId, userHistory);
            if (errorMessage) {
                res.status(400).json({ error: errorMessage });
            } else {
                res.status(200).json({ message: 'User listened enough songs for recommendations' });
            }
        });
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
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public checkUserListeningHistory = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        const { userHistory } = req.body; // Assuming the body contains userHistory array
        try {
            const errorMessage = await this.recommendationService.checkUserListeningHistory(userId, userHistory);
            if (errorMessage) {
                res.status(400).json({ error: errorMessage });
            } else {
                res.status(200).json({ message: 'User listened enough songs for recommendations' });
            }
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default RecommendationController;
