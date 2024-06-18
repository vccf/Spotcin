import { Request, Response } from 'express'; // Assuming you're using Express for your application
import RecommendationService from '../services/recommendation.service';
import { InternalServerError, NotFoundError } from '../utils/errors/http.error'; // Custom error handling if applicable

class RecommendationController {
    private recommendationService: RecommendationService;

    constructor() {
        this.recommendationService = new RecommendationService();
    }

    public getAllRecommendations = async (req: Request, res: Response): Promise<void> => {
        try {
            const recommendations = await this.recommendationService.getAllRecommendations();
            res.json(recommendations);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public getRecommendationByUserId = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        try {
            const recommendation = await this.recommendationService.getRecommendationByUserId(userId);
            if (!recommendation) {
                throw new NotFoundError(`Recommendation not found for user ID: ${userId}`);
            }
            res.json(recommendation);
        } catch (e) {
            if (e instanceof NotFoundError) {
                res.status(404).json({ error: e.message });
            } else {
                console.error(e);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };

    public deleteRecommendationByUserId = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        try {
            await this.recommendationService.deleteRecommendationByUserId(userId);
            res.status(204).send();
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public updateRecommendationByUserId = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        const updatedRecommendation = req.body; // Assuming the body contains the updated recommendation
        try {
            const recommendation = await this.recommendationService.updateRecommendationByUserId(userId, updatedRecommendation);
            if (!recommendation) {
                throw new NotFoundError(`Recommendation not found for user ID: ${userId}`);
            }
            res.json(recommendation);
        } catch (e) {
            if (e instanceof NotFoundError) {
                res.status(404).json({ error: e.message });
            } else {
                console.error(e);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    };

    public createOrUpdateRecommendation = async (req: Request, res: Response): Promise<void> => {
        const newRecommendation = req.body; // Assuming the body contains the new recommendation
        try {
            const recommendation = await this.recommendationService.createOrUpdateRecommendation(newRecommendation);
            res.status(201).json(recommendation);
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public deleteSongFromRecommendation = async (req: Request, res: Response): Promise<void> => {
        const { userId, song } = req.params;
        try {
            await this.recommendationService.deleteSongFromRecommendation(userId, song);
            res.status(204).send();
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };

    public addSongToRecommendation = async (req: Request, res: Response): Promise<void> => {
        const { userId } = req.params;
        const { song } = req.body; // Assuming the body contains the song to add
        try {
            await this.recommendationService.addSongToRecommendation(userId, song);
            res.status(204).send();
        } catch (e) {
            console.error(e);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
}

export default RecommendationController;
